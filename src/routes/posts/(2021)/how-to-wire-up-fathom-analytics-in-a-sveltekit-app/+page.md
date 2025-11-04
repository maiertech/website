---
title: How to wire up Fathom Analytics in a SvelteKit app
author: thilo
publishedDate: 2021-10-15
description:
  'Complete guide to setting up Fathom Analytics in SvelteKit: track page views and goals, handle
  SPAs, use environment variables, and address EU privacy.'
tags:
  - svelte
---

<script>
	import { Figure } from '@maiertech/sveltekit-helpers';
</script>

When I migrated this website from [Next.js](https://nextjs.org/) to
[SvelteKit](https://kit.svelte.dev/), I had to figure out how to set up
[Fathom Analytics](https://usefathom.com/). Fathom Analytics is an alternative to Google Analytics.
It offers a better user experience for website owners and is more privacy-friendly for visitors.
This post expands on Matt Jennings's post
[How to use Fathom Analytics with SvelteKit](https://mattjennings.io/blog/how-to-use-fathom-analytics-with-sveltekit).

## Tracking page views and goals

There are usually two things you want to track with web analytics: _page views_ and _goals_.
Tracking page views helps you see how visitors move through your website, how long they spend on
each page, and which pages are more popular than others. Tracking goals helps you monitor specific
actions you would like your visitors to take, e.g., subscribe to your newsletter or click through to
your Twitter profile. Actions typically involve clicking a link or a button. When such a click
happens, a visitor has done what you wanted them to do, and you can track that you have accomplished
your goal for this visitor.

Like any other analytics platform, Fathom requires a
[custom tracking script](https://usefathom.com/docs/script/script) to be included in your website.
This is straightforward for multipage applications: a visitor loads a page, and the script runs and
records the page view. For single-page applications (SPAs), you need to put in additional work to
ensure that client-side route changes are also tracked. Fathom
[lists common integrations in their docs](https://usefathom.com/docs/integrations), e.g., for
Next.js or Gatsby, but not for SvelteKit.

## Package fathom-client

Package [fathom-client](https://github.com/derrickreimer/fathom-client) gives you full control over
triggering Fathom calls at various points in your SPA's page lifecycle. As Matt's post suggests,
`src/routes/+layout.svelte`, the root layout component, is the place to initialize the tracking
script:

<Figure caption="src/routes/+layout.svelte" class="mb-8">

```svelte
<script>
	import { onMount } from 'svelte';
	import * as Fathom from 'fathom-client';
	onMount(() => {
		Fathom.load('ABCDEFG');
	});
</script>
```

</Figure>

This code snippet uses Svelte's [`onMount` callback](https://svelte.dev/docs#onMount) to load the
tracking script as soon as the layout component has been mounted. Whenever that is the case, the
tracking script records a page view.

## Environment variables in SvelteKit

Your Fathom site ID must be exposed to the client for tracking to work. There is no harm in
hard-wiring this ID in your code, but it is better to move it into an environment variable as shown
here:

<Figure caption="src/routes/+layout.svelte" class="mb-8">

```svelte
<script>
	import { onMount } from 'svelte';
	import * as Fathom from 'fathom-client';
	import { PUBLIC_FATHOM_SITE_ID } from '$env/static/public';

	onMount(() => {
		Fathom.load(PUBLIC_FATHOM_SITE_ID);
	});
</script>
```

</Figure>

The above code snippet uses the module
[`$env/static/public`](https://kit.svelte.dev/docs/modules#$env-static-public) to expose the
variable `PUBLIC_FATHOM_SITE_ID` to the client. Note that the environment variable needs to be
prefixed with `PUBLIC_` to be exposed to the client.

## Dealing with ad-blockers

The tracking script is served from Fathom's domain in the previous code snippets. Since this is a
predictable URL, ad-blockers block the tracking script. Fathom used to offer a way
[to serve the tracking script from a custom domain](https://usefathom.com/docs/script/custom-domains)
using a CNAME record. But in May 2023, they advised their customers to stop using custom domains:

> You're getting this email because you created a custom domain at some point using Fathom
> Analytics.
>
> We've had a few reports of custom domains not collecting data due to expired SSL certificates that
> our vendor isn't renewing automatically, which is unacceptable to us, and we take full
> responsibility for this.
>
> We've tried to fix this issue with our vendor but aren't getting anywhere, so you need to stop
> using your Fathom custom domains right now.

The custom domain approach has always been a double-edged sword. On the one hand, as the website
owner, you are interested in accurately tracking your visitors. On the other hand, by creating a
CNAME record to serve a third-party tracking script, you delegate the reputation of your domain to
that third party. If Fathom had gone rogue, they could have served a malicious tracking script from
your domain, get access to secrets such as authentication cookies, and destroy trust in your domain.
Fathom
[has always been upfront about this potential issue](https://usefathom.com/blog/bypass-adblockers).

## EU isolation

When you use Fathom's default tracking script `cdn.usefathom.com/script.js`, any visits to your
website from within the EU will be processed and anonymized within the EU. This is called _EU_
isolation and
[works out of the box with zero configuration](https://usefathom.com/features/eu-isolation).

Fathom also offers _extreme EU isolation_, where all global traffic is routed through the EU. All
you need to do is use `cdn-eu.usefathom.com/script.js` as tracking script instead of the default
one.

You can provide an options object to `Fathom.load` as the second argument. It has a property `url`,
which defaults to Fathom's default tracking script. If you want extreme EU isolation, you need to
set the `url` option to the alternative tracking script:

<Figure caption="src/routes/+layout.svelte" class="mb-8">

```svelte
<script>
	import { onMount } from 'svelte';
	import * as Fathom from 'fathom-client';
	import { PUBLIC_FATHOM_SITE_ID } from '$env/static/public';

	onMount(() => {
		Fathom.load(PUBLIC_FATHOM_SITE_ID, {
			url: 'https://cdn-eu.usefathom.com/script.js'
		});
	});
</script>
```

</Figure>

## Tracking client-side route changes

The previous code snippets track initial page loads. But once a page has been loaded and the
JavaScript fully hydrated, SvelteKit switches to client-side routing. Any client-side route changes
would not be tracked. To fix this, let's add a reactive statement:

<Figure caption="src/routes/+layout.svelte" class="mb-8">

```svelte
<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { PUBLIC_FATHOM_SITE_ID } from '$env/static/public';
	import * as Fathom from 'fathom-client';
	import { onMount } from 'svelte';

	onMount(() => {
		Fathom.load(PUBLIC_FATHOM_SITE_ID, {
			url: 'https://refreshing-golden-years.maier.tech/script.js'
		});
	});

	// Track page view when path changes.
	$: ($page.url.pathname, browser && Fathom.trackPageview());
</script>
```

</Figure>

This great hack from Matt's post took me a while to understand. The last line is a reactive
statement, but it is not the typical example where something is assigned to a variable. It uses
JavaScript's
[comma operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator),
which evaluates comma-separated operands in sequence and returns the value of the last operand.
`$page.url.pathname` is a reference to the current path in
[SvelteKit's page store](https://kit.svelte.dev/docs#modules-$app-stores), and whenever this value
changes, it triggers the reactive statement. The last operand fires a `trackPageview`, but only when
SvelteKit runs in a browser.

## Tracking goals

Let's assume your goal is to make visitors click through to your Twitter profile. The following
component can render social icons from an array of objects, which it receives as a prop:

<Figure caption="social-icons.svelte" class="mb-8">

```svelte
<script>
	export let icons;
</script>

<div>
	{#each icons as icon (icon.key)}
		<a href={icon.href} on:click={icon.onclick}>
			<span>{icon.title}</span>
			<svelte:component this={icon.component} />
		</a>
	{/each}
</div>
```

</Figure>

Note the `on:click` directive to which an optional callback can be assigned. You can call
`Fathom.trackGoal` with a goal tracking ID in this callback:

```javascript
() => {
	Fathom.trackGoal('UVWXYZ', 0);
};
```

You have to generate the goal-tracking ID in your Fathom dashboard.
