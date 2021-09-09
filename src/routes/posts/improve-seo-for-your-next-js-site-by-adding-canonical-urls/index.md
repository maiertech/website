---
title: Improve SEO for your Next.js site by adding canonical URLs
author: thilo
date: 2021-06-04
description:
  Syndicating content can have a negative impact on your search ranking. Learn
  how to fix this by adding link tags with canonical URLs to your Next.js site.
category: engineering
tags:
  - next
links:
  - title: 'rel=canonical: the ultimate guide (Yoast)'
    href: https://yoast.com/rel-canonical/
  - title: 'Canonical Tags: A Simple Guide for Beginners (Ahrefs)'
    href: https://ahrefs.com/blog/canonical-tags/
  - title: 'The canonical link is king (Fathom Analytics)'
    href: https://usefathom.com/support/canonical-links
  - title: 'Consolidate duplicate URLs (Google Search Central)'
    href: https://developers.google.com/search/docs/advanced/crawling/consolidate-duplicate-urls
  - title: 'Avoid creating duplicate content (Google Search Central)'
    href: https://developers.google.com/search/docs/advanced/guidelines/duplicate-content
---

Duplicate content within a domain or across domains should be avoided since it
can result in unexpected search rankings if not handled properly. When a search
engine detects duplicate content it has to figure out which version it considers
to be the canonical (or original) version. A search engine will rank the
canonical version higher than duplicates. If a search engine thinks that your
original content is a duplicate, you have a problem. You can run into this issue
when you syndicate content to other websites with the goal of increasing
visibility in search results for your own website. If you do not configure
canonical URLs correctly, there is a chance that you achieve the exact opposite,
i.e. you lower the visbility of your own website in search results.

## What is a canonical URL?

A canonical URL is a `link` tag added to the `head` of an HTML page that gives
search engines a hint by pointing to the canonical version of the page:

```html
<link
  rel="canonical"
  href="https://maier.tech/posts/improve-seo-for-your-next-js-site-by-adding-canonical-urls"
/>
```

Search engines will honor this declaration and rank the canonical URL higher
than any duplicates, unless they come across conflicting declarations of what
the canonical URL of a specific piece of content is.

## Why would you want duplicate content?

The best way to handle duplicate content is to avoid it. But you might want to
make a conscious decision to allow duplicate content for one of the following
reasons:

- to syndicate content to another website (e.g. by cross-posting to a community
  like [DEV](https://dev.to/)),
- to allow accessing the same content via different URLs (e.g. in a product
  catalog),
- you are using
  [deploy previews](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/),
  which have the side effect that they create duplicate content
  ([Vercel actually prevents indexing deploy previews to mitigate duplicate content issues](https://vercel.com/docs/platform/deployments#preview)).

But chances are that duplicate content is the result of a configuration error.
For instance, if your blog serves the same content whether or not you put a
trailing slash on URLs, you should configure your site to use one type of URLs
only. This URL

```
https://maier.tech/improve-seo-for-your-next-js-site-by-adding-canonical-urls
```

(without trailing slash) and this URL

```
https://maier.tech/improve-seo-for-your-next-js-site-by-adding-canonical-urls/
```

(with trailing slash) are not the same.
[Next.js automatically redirects a URL with trailing slash to the corresponding URL without trailing slash.](https://nextjs.org/docs/api-reference/next.config.js/trailing-slash)

## Add canonical URLs and other SEO metadata to your pages with next-seo

You can use package [next-seo](https://github.com/garmeeh/next-seo) to add SEO
metadata to every page in Next.js. You can create an `SEO` component as wrapper
around `NextSeo` to handle canonical URLs:

```tsx:components/seo.tsx
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

const siteUrl = 'https://maier.tech';

type Props = {
  title: string;
  description: string;
  canonicalUrl?: string;
};

export default function SEO({ title, description, canonicalUrl }: Props) {
  const router = useRouter();
  const path = router.asPath;
  const url = `${siteUrl}${path}`;
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonicalUrl ?? url}
      openGraph={{ url, title, description }}
    />
  );
}
```

`SEO` receives a `title`, `description` and optional `canonicalUrl` as props.
Passing in `canonicalUrl` means that the generated page is a duplicate and its
metadata will contain a `link` tag that points search engines to the canonical
URL. Omitting `canonicalUrl` means that the generated page is the original page
and its URL is the canonical URL. Then add `SEO` to every page:

```jsx:pages/posts/[slug].tsx
...
<Layout>
  <SEO title={post.title} description={post.description} />
  ...
</Layout>
...
```

In this example, `post` needs to be retrieved with
[`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)
from a CMS or from the frontmatter of a Markdown file. The resulting `head` of
the generated HTML page looks like this:

```html
...
<head>
  <meta name="viewport" content="width=device-width" />
  <meta charset="utf-8" />
  <title>
    Improve SEO for your Next.js site by adding canonical URLs – Thilo Maier
  </title>
  ...
  <meta
    name="description"
    content="Syndicating content can have a negative impact on your search ranking. Learn how to fix this by adding link tags with canonical URLs to your Next.js site."
  />
  ...
  <link
    rel="canonical"
    href="https://maier.tech/posts/improve-seo-for-your-next-js-site-by-adding-canonical-urls"
  />
  ...
</head>
...
```

Note the `link` tag with `rel="canonical"`, which contains the canonical URL. If
the generated page is served from the canonical URL, you can omit the canonical
`link` tag since in this case there is no duplicate content.

But if you syndicate content from your own website to another website, such as
DEV, you also need to add a canoncial URL on the other website. The canonical
URL needs to point to the original content on your website. The exact way how
this is done varies by service. You can find the instructions for adding a
canonical URL on DEV [here](https://dev.to/p/editor_guide#front-matter).
