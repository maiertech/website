---
title: How to add a basic SEO component to SvelteKit
author: thilo
publishedDate: 2023-05-20
description:
  How to build a basic SEO component in SvelteKit, add meta tags, and manage canonical URLs for
  better search engine optimization.
tags:
  - svelte
  - seo
---

<script>
	import { CodeSnippet, Figure } from '@maiertech/sveltekit-helpers';
	import SeoDataFlowImage from './SeoDataFlowImage.svelte';
	import app_html from './examples/app.html?raw';
</script>

SvelteKit does not come with a built-in SEO component. The
[SvelteKit SEO docs](https://kit.svelte.dev/docs/seo#manual-setup) provide guidance on the minimal
requirements for an SEO component, but they do not go into implementation details. In this post, I
will show you how to build a basic SEO component and what data it should provide to search engines.

## SEO meta tags

You need to put SEO data into the `<head>` element of each page as
[meta tags](https://ahrefs.com/blog/seo-meta-tags/). Some meta tags are the same for each page, and
SvelteKit adds them for you in `src/app.html`, e.g., meta charset and meta viewport:

<Figure caption="src/app.html" class="mb-8">
	<CodeSnippet lang="html" src={app_html} />
</Figure>

Other meta tags are page-specific, and you need to figure out a way to set them for each page.
Svelte comes with a special element
[`<svelte:head>`](https://svelte.dev/docs#template-syntax-svelte-head), which makes it possible to
add meta tags to pages dynamically. The SvelteKit SEO docs recommend adding at least the _title_ and
_description_ meta tags, but I recommend adding a third one: _canonical URL_.

## What is a canonical URL?

A canonical URL is a `<link>` tag added to the `<head>` of an HTML page. It looks like this:

```html
<link
	rel="canonical"
	href="https://maier.tech/posts/how-to-add-a-basic-seo-component-to-sveltekit"
/>
```

When a search engine detects duplicate content, whether within a website or across websites, it has
to determine which instance it considers to be the original. Search engines rank what they consider
to be the canonical version higher than duplicates. In other words, duplicate content gets an SEO
penalty. The link tag provides search engines with a hint about what they should consider the
canonical version.

There are two common scenarios for duplicate content:

1. When you syndicate content, i.e., you cross-publish it to other websites. For example, some
   developers publish their posts on their personal website and cross-post to
   [Hashnode](https://hashnode.com/) to reach a bigger audience. If they want SEO traffic to be
   directed to their personal website, they have to ensure that search engines consider that URL the
   canonical version.

2. Accidental duplication, e.g., your website can be reached at `https://example.com` and
   `https://www.example.com`, or when deploy previews get indexed by search engines accidentally.

Adding a canonical link tag can help you manage these two scenarios.

## Building a basic SEO component

Before I show you how to build a basic SEO component, let me address the question of whether you
should use an SEO component package. There is
[svelte-meta-tags](https://github.com/oekazuma/svelte-meta-tags) by Kazuma Oe and
[Svead](https://github.com/spences10/svead) by Scott Spences. They are both viable options, but they
are essentially just a `<svelte:head>` with props.

SEO requirements vary based on your content and target audience. For example, for a blog, you may
want to support [Open Graph metadata](https://ogp.me/) but also
[structured data with JSON-LD Article](https://developers.google.com/search/docs/appearance/structured-data/article).
A one-size-fits-all SEO component like the one from svelte-meta-tags has a complicated API because
it covers many use cases. I think it is better to start with a small custom SEO component, study
Google's [Ranking and search appearance docs](https://developers.google.com/search/docs/appearance),
and add more SEO data on the fly when you need it.

So, here is my basic SEO component:

<Figure caption="Basic SEO component for a SvelteKit app." class="mb-8">

```svelte
<script>
	import { PUBLIC_URL_ORIGIN } from '$env/static/public';
	import { page } from '$app/stores';
	import decorate from '$lib/utils/decorate';

	/** @type {import('$lib/types').SeoDefaultData} */
	export let data;
</script>

<svelte:head>
	<title>{$page.url.pathname !== '/' ? decorate(data.title) : data.title}</title>
	<meta name="description" content={data.description} />
	<link rel="canonical" href={data.canonical_url ?? `${PUBLIC_URL_ORIGIN}${$page.url.pathname}`} />
</svelte:head>
```

</Figure>

The component is also just a `<svelte:head>` with props: `title` (required), `description`
(required), and `canonical_url` (optional). They are passed in as a `data` object. This component
works with SvelteKit only because it imports SvelteKit's `page` store, which provides access to the
current path. I decorate the SEO title on all pages, except the root page, with a `decorate`
function. For example, I could append my name:

<Figure caption="src/lib/utils/decorate.js" class="mb-8">

```javascript
/**
 * Decorate SEO title.
 * @param {string} title
 */
export default function (title) {
	return `${title} | Thilo Maier`;
}
```

</Figure>

Decorating the SEO title is an opportunity to add lightweight branding when you appear in search
results, but there is no guarantee that search engines will use the decorated SEO title in their
search results. They might also use the text of the `<h1>` element.

The _description_ meta tag is just text with a short description of the page. Keep it very short.
There is no room for unnecessary words in search results. In general, consider SEO meta tags to be
suggestions for search engines on how to rank and display you in search results, not instructions.

The canonical link tag of the SEO component covers the two scenarios mentioned before. First, it
sets a default canonical URL as insurance against an SEO penalty caused by accidental duplicate
content. The origin of the default canonical URL comes from the environment variable
`PUBLIC_URL_ORIGIN`, e.g., https://www.maier.tech, and is intentionally hard-wired.

If you provide the property `canonical_url`, it will override the default canonical URL. This is
useful when you syndicate content from another website and that other website is the canonical
website.

## How to retrieve SEO data

Now that we have a basic SEO component, we need to figure out how to retrieve the title and
description for each page and pass them into the SEO component. If your site has only a few pages,
you can add the SEO component to each page and hard-wire the title and description.

But for more complex sites, the SEO component is placed in a layout. The layout is unaware of which
page it wraps. Therefore, we have to find a way to get page data into a layout. Let's recap
SvelteKit's [load functions](https://kit.svelte.dev/docs/load):

- For `+page.svelte`, a load function can be placed in `+page.js` or `+page.server.js` (or their
  TypeScript equivalents).
- For `+layout.svelte`, a load function can be placed in `+layout.js` or `+layout.server.js` (or
  their TypeScript equivalents).

SEO data is page-specific and needs to be retrieved at the page level in `+page.js` or
`+page.server.js`. But the SEO component is rendered as part of the layout. So, how can we get
page-specific SEO data into a layout? Let's look at the following diagram:

<Figure caption="How SvelteKit's load functions share data." class="mb-8">
	<SeoDataFlowImage />
</Figure>

The diagram shows a `+page.svelte` and its corresponding `+page.js`, which contains the load
function. This load function has to return SEO data and any other data required to render the page.
However, the SEO data is required in `+layout.svelte`, which renders the SEO component. We have to
share the data retrieved in `+page.js` _upwards_.

By default, SvelteKit shares data returned from load functions _downwards_, i.e., the data passed
from `+layout.js` to `+layout.svelte` is merged into the data passed from `+page.js` to
`+page.svelte`.

For the opposite direction, SvelteKit uses the `page` store. Therefore, we can access the data
returned from `+page.js` with `$page.data` inside `+layout.svelte`.

To wrap up this post, let's look at two code examples. The first one shows a minimal load function
for a page:

<Figure caption="src/routes/+page.js" class="mb-8">

```javascript
export function load() {
	return {
		title: 'Thilo Maier',
		description:
			"Hi, I'm Thilo. I am a developer based in Rotterdam, NL. I build web apps with SvelteKit and Svelte and keep improving my developer happiness."
	};
}
```

</Figure>

This load function returns only a title and description. The second code example shows how to
retrieve the title and description from <code>$page.data</code> in a layout further up in the
component hierarchy:

<Figure caption="src/routes/+layout.svelte" class="mb-8">

```svelte
<script>
	import { page } from '$app/stores';
	import { PUBLIC_URL_ORIGIN } from '$env/static/public';
	import { SeoComponent } from '$lib/seo';
	import '../app.css';
</script>

<SeoComponent
	url={$page.url}
	canonical_origin={PUBLIC_URL_ORIGIN}
	data={{ title: $page.data.title, description: $page.data.description }}
/>

<div>Homepage</div>
```

</Figure>
