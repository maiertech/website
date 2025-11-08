---
title: Do I need a sitemap for my SvelteKit app, and how do I create it?
author: thilo
publishedDate: 2023-03-01
description:
  "Do you need a sitemap for your SvelteKit site? Learn when it's useful, how to create one, and
  static alternatives like svelte-sitemap."
tags:
  - svelte
  - seo
---

<script>
	import { Figure, P } from '@maiertech/sveltekit-helpers';
	import SubmittedSitemapImage from './SubmittedSitemapImage.svelte';
</script>

<P>
Last week I refactored parts of this website and accidentally broke the endpoint that creates <a href="/sitemap.xml" data-sveltekit-reload>this sitemap</a>. I decided to read up on doing sitemaps the right way. Here is what I learned.
</P>

## Google's take on sitemaps

Web developers often assume that Google will only index their site regularly if they have a sitemap.
But is this true? In the
[Google Search Console docs](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview#do-i-need-a-sitemap),
Google answers the question "Do I need a sitemap?" with "it depends." Google recommends a sitemap
when

- you launch a new site, and no or few external links point to your site, or
- your site is large, and not all pages are linked and discoverable by Google's crawler.

You do not need a sitemap if

- your site is small (up to 500 relevant pages), or
- your site is linked correctly and Google can find all relevant pages by crawling it.

The website you're reading this on is small and all pages are discoverable by crawlers, so I
wouldn't strictly need a sitemap. Still, I submitted one in May 2021 as an initial SEO boost. You
can see when Google last read a sitemap in the Search Console. For my site it was almost two years
ago (at the time of writing):

<Figure caption="For small sites, a sitemap is only initially relevant." class="mb-8">
	<SubmittedSitemapImage />
</Figure>

## Different types of sitemaps

Google supports
[different types of sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#xml).
If your site already has an RSS feed, you can submit the feed URL as a sitemap and call it a day.
The most common sitemap type is XML. A simple XML sitemap that indexes only the homepage looks like
this:

<Figure caption="sitemap.xml" class="mb-8">

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>https://maier.tech/</loc>
		<lastmod>2023-02-28</lastmod>
	</url>
</urlset>
```

</Figure>

Every indexed page goes in a `<url>` tag. The `<loc>` tag contains the URL of the indexed page. The
`<lastmod>` tag contains the last modified date. You may have encountered blog posts that mention
two additional tags, `<priority>` and `<changefreq>`. There is no need to worry about choosing
values for these tags.
[Google ignores both](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#xml).
[And so does Bing](https://blogs.bing.com/webmaster/february-2023/The-Importance-of-Setting-the-lastmod-Tag-in-Your-Sitemap).

## Creating a sitemap with SvelteKit

[SvelteKit's SEO docs](https://kit.svelte.dev/docs/seo#manual-setup-sitemaps) show an example of a
sitemap implemented as an endpoint in `src/routes/sitemap.xml/+server.ts`. The `GET` handler
assembles an XML string to which you add the relevant routes. You don't need to include every route,
only those you want indexed by Google (for example, your posts). The catch is figuring out how to
retrieve the entries for your sitemap. There's no copy-paste blueprint because it depends on how you
manage your content. Below, I'll walk through the high-level steps.

### Step 1: Figure out how to retrieve the pages for your sitemap

I write my posts in Markdown and use [Content Collections](https://www.content-collections.dev/) to
access post metadata. Retrieving all posts for a sitemap requires one server-side import:

```ts
import { all as posts } from '$lib/server/collections/posts';
```

The import comes from this file:

<Figure caption="src/lib/server/collections/posts.ts" class="mb-8">

```ts
import { allPosts } from 'content-collections';

export const all = allPosts.toSorted((a, b) => {
	return b.publishedDate.localeCompare(a.publishedDate);
});
```

</Figure>

and all the heavy lifting is done by Content Collections. Less fancy solutions are also totally
fine. For example, you could add an endpoint that returns the posts from a manually maintained JSON
file. If you manage your posts in a CMS, that endpoint would retrieve them via an API call.

### Step 2: Create a sitemap endpoint

Create an endpoint at `src/routes/sitemap.xml/+server.ts` and add a `GET` handler. My handler uses
the post collection:

<Figure caption="src/routes/sitemap.xml/+server.ts" class="mb-8">

```ts
import { ORIGIN } from '$env/static/private';
import { all as posts } from '$lib/server/collections/posts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	// Create sitemap entries for posts.
	const postEntries = posts.map(
		(post) => `\t<url>
		<loc>${ORIGIN}${post.path}</loc>
		<lastmod>${post.lastmodDate ? post.lastmodDate : post.publishedDate}</lastmod>
	</url>`
	);

	// Add additional collections to this array.
	const pages = [...postEntries];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		}
	});
};
```

</Figure>

This endpoint reads all posts from the posts collection and wraps them into `<url>` tags in the
format discussed in the first part of this post. The content type of the response is
`application/xml`. Since the paths in my post collection are relative, I need to prepend the origin
from environment variable `ORIGIN` because sitemaps require absolute URLs.

The above code is a simplified version of my
[actual endpoint](https://github.com/maiertech/website/blob/main/src/routes/sitemap.xml/%2Bserver.ts),
which you can explore on GitHub. If you want to see an example of how to define content collections
with transformations, look at the file
[`content-collections.ts`](https://github.com/maiertech/website/blob/main/content-collections.ts).

## Alternative sitemap creation

If your SvelteKit site uses [adapter-static](https://kit.svelte.dev/docs/adapter-static), you can
use the package [svelte-sitemap](https://github.com/bartholomej/svelte-sitemap). With this package,
instead of implementing an endpoint for a sitemap, you can configure the `postbuild` hook in
`package.json` to scan all routes in the `build` directory and create `build/sitemap.xml`. This
approach only works with adapter-static, since svelte-sitemap cannot determine all possible routes
for other adapters.
