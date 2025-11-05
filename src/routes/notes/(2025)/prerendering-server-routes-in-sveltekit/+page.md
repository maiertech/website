---
title: Prerendering server routes in SvelteKit
description:
  'SvelteKit auto-prerenders server routes, but manual `prerender = true` is needed for all server
  routes called by a prerendered endpoint.'
publishedDate: 2025-07-07
link: 'https://svelte.dev/docs/kit/page-options#prerender-Prerendering-server-routes'
---

TIL: When you prerender a page that uses a server route in SvelteKit, the corresponding `+server.ts`
is automatically prerendered (if possible) unless it states `export const prerender = false`.

However, when you prerender a server route, for example `/sitemap.xml`, you have to manually set
`export const prerender = true` in every server route that `/sitemap.xml` calls.
