---
title: Do I need a sitemap for my SvelteKit app, and how do I create it?
author: thilo
published: 2023-03-01
modified: 2023-03-06
description: In this post, I provide an overview of when you need a sitemap, what format it should have, and explain how to create an endpoint for a sitemap in SveltKit.
topics: [svelte, web-fundamentals]
tags: [sveltekit, seo]
---

<script>
  import Image from '$lib/components/image.svelte';
  import Highlight from 'svelte-highlight';
  import { javascript, xml} from 'svelte-highlight/languages';
  import sitemap_xml from './sitemap.xml.txt?raw';
  import endpoint_js from './endpoint.js.txt?raw';
  import create_entry_js from './create-entry.js.txt?raw';
  import error_handling_js from './error-handling.js.txt?raw';
</script>

Last week I refactored parts of this website and broke the endpoint that creates <a data-sveltekit-reload href="/sitemap.xml">this sitemap</a>. I decided to read up on sitemaps before fixing the route. Here is what I learned.

## Google's take on sitemaps

Web developers often assume that Google might only index their site regularly with a sitemap. But is this true? In the [Google Search Console docs](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview#do-i-need-a-sitemap), Google answers the question "Do I need a sitemap?" with it depends. Google recommends a sitemap when

- you launch a new site, and no or few external links point to your site or
- your site is large, and not all pages are linked and discoverable by Google's crawler.

You do not need a sitemap if

- your site is small (up to 500 relevant pages) or
- your site is linked correctly, and Google can find all relevant pages by crawling it.

My website [maier.tech](https://maier.techg) is small, and all pages are discoverable by a crawler. As recommended by Google, I submitted a sitemap in May 2021 as an initial SEO boost. You can see when Google last read a sitemap in the Google Search Console. For my site maier.tech it was almost two years ago:

<figure>
<Image
  ratio={1868/544}
  alt="Screenshot of submitted sitemaps in the Google Search Console. Sitemap submission date: May 21, 2021. Sitemap last read: June 28, 2021."
  url="https://share.mailbox.org/ajax/share/059cb3a003a6d60851f7ccb3a6d6403c84328f7c08a553af/1/8/MjQz/MjQzLzM1OQ?dl=true"
  loading="lazy" />
<figcaption>For small sites, a sitemap is only initially relevant.</figcaption>
</figure>

## Different types of sitemaps

Google supports [different types of sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#xml). If your site already has an RSS feed, you can submit the feed URL as a sitemap and call it a day. But the most common sitemap type is XML. A simple XML sitemap that indexes only the homepage looks like this:

<Highlight language={xml} code={sitemap_xml} />

Every indexed page goes in a `<url>` tag. The `<loc>` tag contains the URL of the indexed page. The `<lastmod>` tag contains the last modified date. You may have encountered posts mentioning two more tags, `<priority>` and `<changefreq>`. There is no need to worry about choosing values for these two tags. [Google ignores both](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#xml) ([and so does Bing](https://blogs.bing.com/webmaster/february-2023/The-Importance-of-Setting-the-lastmod-Tag-in-Your-Sitemap)).

## Creating a sitemap with SvelteKit

[SvelteKit's SEO docs](https://kit.svelte.dev/docs/seo#manual-setup-sitemaps) show an example of a sitemap implemented as an endpoint in `src/routes/sitemap.xml/+server.js`. The `GET` handler assembles an XML string to which you add relevant routes. There is no need to add all routes, only those you want to be indexed by Google. The catch is that you need to figure out how to retrieve the entries for your sitemap. There is no copy-paste blueprint for how to create a sitemap with SvelteKit. But I will walk you through the steps.

### Create endpoints to retrieve relevant pages

I created an endpoint [`src/api/posts/+server.js`](https://github.com/maiertech/maier.tech/blob/main/src/routes/api/posts/%2Bserver.js) that returns a list of all posts. I manage my posts in Markdown files; the endpoint reads the frontmatters and returns them. If I managed my posts in a CMS, the endpoint would retrieve them via an API call to the CMS. Add an endpoint for each type of content you want to include in your sitemap.

### Create a sitemap endpoint

Create endpoint `src/routes/sitemap.xml/+server.js` and add an async `GET` handler with the following structure:

<Highlight language={javascript} code={endpoint_js} />

Since this endpoint returns XML, I set the content type to `application/xml`. Then I fetch all posts from my endpoint `/api/posts`. At the end of the handler, I create the XML string, wrap it in a response object and return it.

To make creating entries easier, I use this helper function:

<Highlight language={javascript} code={create_entry_js} />

`path` is a relative path, and `lastmod` is a date string in ISO format. I get both from my `/api/posts` endpoint. `ORIGIN` is an environment variable containing my site's origin, `https://maier.tech`. Google expects absolute URLs in a sitemap. And since a SvelteKit app cannot determine its public URL, I use the `ORIGIN` variable to assemble absolute URLs.

Let's add error handling to wrap up the handler:

<Highlight language={javascript} code={error_handling_js} />

The above code is a simplified version of my [actual endpoint](https://github.com/maiertech/maier.tech/blob/main/src/routes/sitemap.xml/%2Bserver.js), which you can explore on GitHub. My actual endpoint adds caching, validation, and prerendering.

## Alternative sitemap creation

If your SvelteKit site uses [adapter-static](https://kit.svelte.dev/docs/adapter-static), you can use package [svelte-sitemap](https://github.com/bartholomej/svelte-sitemap). With this package, instead of implementing an endpoint for a sitemap, you can configure the `postbuild` hook in `package.json` to scan all routes in the `build` directory and create `build/sitemap.xml`. This approach only works with adapter-static since svelte-sitemap cannot determine all possible routes for other adapters.
