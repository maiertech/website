---
title: How to wire up Fathom Analytics in a SvelteKit app
author: thilo
published: 2021-10-15
modified: 2022-06-28
description:
  In this post, you will learn how to set up Fathom Analytics in a SvelteKit app
  to track pageviews and goals while ensuring privacy for your visitors.
topics: [svelte, web-fundamentals]
tags: [sveltekit, seo]
---

When I migrated this website from [Next.js](https://nextjs.org/) to
[SvelteKit](https://kit.svelte.dev/), I had to figure out how to wire up
[Fathom Analytics](https://usefathom.com/). Fathom Analytics is an alternative
to Google Analytics. It features a better user experience for website owners and
is more privacy-friendly for visitors to your website. This post expands on
[Matt Jennings's](https://mattjennings.io/) post
[How to use Fathom Analytics with SvelteKit](https://mattjennings.io/blog/how-to-use-fathom-analytics-with-sveltekit).

## Tracking pageviews and goals

There are usually two things you want to track with web analytics: _pageviews_
and _goals_. Tracking pageviews helps you understand how visitors navigate
through your website, how long they spend on each page and which pages are more
popular than others. Tracking goals helps you track specific actions that you
would like your visitors to do, e.g. subscribe to your newsletter or click
through to your Twitter profile. Actions typically involve clicking a link or a
button. When such a click happens, a visitor has done what you wanted them to do
and you can track that you have accomplished your goal for this visitor.

Like with any other analytics tool, Fathom requires a
[custom tracking script](https://usefathom.com/docs/script/script) to be
included in your website. This is straightforward for multi-page applications: a
visitor loads a page and the script runs and records the pageview. For
single-page applications (SPAs), you need to put in additional work to ensure
that client-side route changes are also tracked. Fathom
[lists common integrations in their docs](https://usefathom.com/docs/integrations),
e.g. for Next.js or Gatsby, but not for SvelteKit.

## Package fathom-client

Package [fathom-client](https://github.com/derrickreimer/fathom-client) gives
you full control over triggering Fathom calls at various points in your SPA's
page lifecycle. As Matt's post suggests, `src/routes/__layout.svelte`, the
default layout component, is the place to initialize the tracking script:

```svelte:src/routes/__layout.svelte
<script>
  import { onMount } from 'svelte';
  import * as Fathom from 'fathom-client';

  onMount(() => {
    Fathom.load('FATHOM_SITE_ID', {
      includedDomains: ['maier.tech'],
    });
  });
</script>
```

This code snippet uses Svelte's
[`onMount` callback](https://svelte.dev/docs#onMount) to load the tracking
script as soon as the layout component has been mounted. Whenever that is the
case, the tracking script records a pageview.

The second argument in `load` is an
[object of options](https://github.com/derrickreimer/fathom-client#api-reference).
It has a property `url`, which defaults to Fathom's tracking script
https://cdn.usefathom.com/script.js. Property `includedDomains` tells the
tracking script to track the production website only, which is served from
`maier.tech`. Any other instances of the website, e.g. deploy previews, are not
tracked.

## Environment variables in SvelteKit

Your Fathom site ID needs to be exposed to the client for tracking to work.
There is no harm in hard-wiring this ID in your code, but it is better to move
it into an environment variable as shown here:

```svelte:src/routes/__layout.svelte
<script>
  import { onMount } from 'svelte';
  import * as Fathom from 'fathom-client';

  onMount(() => {
    Fathom.load(import.meta.env.VITE_FATHOM_SITE_ID, {});
  });
</script>
```

[Environment variables in SvelteKit](https://kit.svelte.dev/faq#env-vars)
actually
[rely on Vite to expose them to the client](https://vitejs.dev/guide/env-and-mode.html#env-variables-and-modes).
Therefore, you need to access the environment variable via
`import&#xFEFF;.meta.env` and not `process&#xFEFF;.env`. Vite will expose any
environment variables defined in the build environment that start with `VITE_`.

## Serving the tracking script from a custom domain

In previous code snippets, the tracking script is served from Fathom's domain.
This means that sooner than later the tracking script will be blocked by
ad-blockers. Fathom offers a way to serve the tracking script from a custom
domain using a
[CNAME record](https://www.cloudflare.com/learning/dns/dns-records/dns-cname-record/).
Serving the tracking script from the same domain as the tracked website
increases the chances that the tracking script is not blocked by ad-blockers or
other browser security mechanisms. I will not go into the details of how this is
done, because you can read up on it
[here in the Fathom docs](https://usefathom.com/docs/script/custom-domains).

This approach is a double-edged sword. On the one hand, you as the website owner
have an interest in accurately tracking your visitors to improve your site and
serve them better. On the other hand, by creating that CNAME record, you
delegate the reputation of your domain to a third party. If Fathom went rogue,
they could serve a malicious tracking script from your domain, get access to
secrets such as authentication cookies and thereby destroy trust in your domain.
Fathom is upfront about this potential issue. They make a strong case for why
you should trust them in
[this post](https://usefathom.com/blog/bypass-adblockers).

If you choose to serve your tracking script from your custom domain, you need to
set the `url` option, as shown below, using the custom tracking script URL
provided by Fathom. While you are at it, you should also set the `honorDNT`
option to true. DNT refers to the "Do Not Track" request header, which is
[officially deprecated](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/DNT),
but still supported in
[Chrome](https://support.google.com/chrome/answer/2790761?hl=en&co=GENIE.Platform%3DDesktop&oco=1)
and
[Firefox](https://support.mozilla.org/en-US/kb/how-do-i-turn-do-not-track-feature).
This gives visitors to your website a way to completely opt out of tracking.

```svelte:src/routes/__layout.svelte
<script>
  import { onMount } from 'svelte';
  import * as Fathom from 'fathom-client';

  onMount(() => {
    Fathom.load(import.meta.env.VITE_FATHOM_SITE_ID, {
      url: 'https://firefly.maier.tech/script.js',
      honorDNT: true,
    });
  });
</script>
```

## Tracking client-side route changes

The previous code snippet tracks the initial page load, which is the
server-rendered app that has been delivered to the client. But once this page
has been loaded and the JavaScript fully hydrated, the app switches to
client-side routing and the tracking configured so far is completely blind to
client-side route changes. To fix this, let's add one more line and
corresponding imports:

```svelte:src/routes/__layout.svelte
<script>
  import { onMount } from 'svelte';
  import * as Fathom from 'fathom-client';
  import { page } from '$app/stores';
  import { browser } from '$app/env';

  onMount(() => {
    Fathom.load(import.meta.env.VITE_FATHOM_SITE_ID, {
      url: 'https://firefly.maier.tech/script.js',
      honorDNT: true,
    });
  });

  // Track page view when path changes.
  $: $page.url.pathname, browser && Fathom.trackPageview();
</script>
```

This great hack from Matt's post took me a while to understand. This
[Twitter thread](https://twitter.com/liyuanqiu/status/1149235193296773122) gave
me a crucial hint. The last line is a Svelte
[reactive statement](https://svelte.dev/docs#3_$_marks_a_statement_as_reactive),
but it is not the typical example from the
[Svelte tutorial](https://svelte.dev/tutorial) where something is assigned to a
variable. It uses JavaScript's
[comma operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator),
which evaluates comma-separated operands in sequence and returns the value of
the last operand. `$page.url.pathname` is a reference to the current path in
[SvelteKit's page store](https://kit.svelte.dev/docs#modules-$app-stores) and
whenever this value changes it triggers the reactive statement. The last operand
fires a `trackPageview`, but only when the app is running in a browser.

## Tracking goals

Unlike tracking pageviews, there is no blueprint for tracking goals with Fathom.
The actual API is straightforward. Call
[`trackGoal`](https://github.com/derrickreimer/fathom-client#trackgoalcode-string-cents-number)
whenever a visitor has completed an action that you wanted them to do.

Let's assume that your goal is to make visitors click through to your Twitter
profile. The following component can render social icons from an array of
objects, which it receives as a prop:

```svelte:social-icons.svelte
<script>
  export let icons;
</script>

<div>
  {#each icons as icon (icon.key)}
    <a href={icon.href} on:click={icon.onclick}>
      <span>{icon.title}</span>
      <svelte:component
        this={icon.component}
      />
    </a>
  {/each}
</div>
```

Note the [`on:click`](https://svelte.dev/docs#on_element_event) directive to
which an (optional) `icon.onclick` callback can be assigned. When rendering
social icons with the following array

```js
const icons = [
  {
    key: 'twitter',
    title: 'Twitter',
    href: 'https://twitter.com/maiertech',
    component: TwitterLogo,
    onclick: () => {
      Fathom.trackGoal('FATHOM_GOAL_ID', 0);
    },
  },
  {
    key: 'github',
    title: 'GitHub',
    href: 'https://github.com/maiertech',
    component: GitHubLogo,
  },
];
```

you get a Twitter icon, which tracks goal `FATHOM_GOAL_ID` when clicked. But
when you click the GitHub icon, no goal is tracked, because no callback has been
assigned.
