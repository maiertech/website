---
title: 'It ain’t easy to move a side project off Big Tech'
author: thilo
publishedDate: 2025-11-07
description:
  Migrating a side project from Vercel to Railway exposed the challenges of moving off Big Tech, but
  the price tag in terms of time and effort was higher than expected.
tags:
  - railway
  - svelte
---

<script>
  import { Figure } from '@maiertech/sveltekit-helpers';
  import BunnyDnsImage from './BunnyDnsImage.svelte';
  import RailwayDashboardImage from './RailwayDashboard.svelte';
</script>

Recently, I migrated this SvelteKit website from [Vercel](https://vercel.com/) to
[Railway](https://railway.com/). Like many other developers in Europe, I am worried about Europe's
dependency on Big Tech. Wouldn't it make sense to move my website off Big Tech and prove to the
world that we can do without Big Tech?

After a first round of diving into the world of [Hetzner](https://www.hetzner.com/) self-hosters and
[Coolify](https://coolify.io/) enthusiasts, it dawned on me that moving a hobby project off Big Tech
requires a serious time commitment. After Vercel had liberated me from DevOps a few years ago, I did
not want to go back to fiddling with servers and deployment pipelines. That's when I decided to
water down my ambitions and settle for Railway.

Railway is technically not Big Tech, but it's also not a European company. Don't get me wrong, I
think Railway is a fantastic platform with a great team. I see them as a stepping stone toward
something that has yet to be created in Europe.

<Figure caption="Railway has a polished dashboard and DX that is on par with Vercel." class="mb-8">
	<RailwayDashboardImage />
</Figure>

The biggest change that came with migrating to Railway was that I had to switch from Vercel's
serverless architecture to containerized Node hosting. Luckily, Railway abstracts away the
complexity around creating and deploying a Docker image in combination with a Vercel-like GitHub
integration and DX. All I had to do in my SvelteKit app was replace
[adapter-vercel](https://svelte.dev/docs/kit/adapter-vercel) with
[adapter-node](https://svelte.dev/docs/kit/adapter-node).

However, this was far more than just swapping one adapter for another. With adapter-node, my site
broke in unexpected ways. For instance, prerendering failed on Railway builds while working locally.
I refactored my collections of posts and notes using
[Content Collections](https://www.content-collections.dev/). This simplified my codebase and fixed
the prerendering issues, but it was a major undertaking.

On to more problems. On Vercel, I had served my website from the apex domain `maier.tech` and let
Vercel redirect the `www` subdomain to the apex domain. This can be done on Vercel by ticking a box.
Railway, however, does not support platform-level redirects. And my registrar does not support
redirects either, because they would need to handle the traffic for the `www` subdomain. I'm already
happy that my registrar gives me an `ALIAS` record that allows me to use the apex domain with
Railway. But modern DNS management with redirects? Negative. I thought, never mind, I'll implement
the redirect in SvelteKit's `handle` function in `hooks.server.ts`. This works great, except it
doesn't for prerendered pages. Requests to prerendered pages are never routed through the `handle`
hook for obvious reasons.

I started to get frustrated. Maybe I could delegate my DNS records to
[Bunny.net DNS](https://bunny.net/dns)? They position themselves as a Cloudflare alternative, so I
expected to be able to configure the redirect from the `www` subdomain to the apex domain. It turns
out Bunny does not support `.tech` domains. Why? Nobody knows.

<Figure caption="Bunny DNS supports all kinds of domains except .tech domains." class="mb-8">
	<BunnyDnsImage />
</Figure>

At this point I was tempted to pull a Big Tech trump card and use
[Cloudflare DNS](https://www.cloudflare.com/en-gb/application-services/products/dns/). But then I
would still have a Big Tech dependency in my setup. After some consideration, I decided to bite the
bullet and deploy a second SvelteKit app to Railway. It's a minimal app that serves `www.maier.tech`
but redirects all requests to `maier.tech`. That way, I can continue to prerender most of the pages
served at `maier.tech`.

My website is now off Big Tech. But was it worth it? I am not sure. Big Tech is really good at
making things convenient. And convenience saves time. And saved time allows me to code and ship
more. On the other hand, my SvelteKit website now runs with adapter-node. This opens the door to
Docker hosting, but I am not sure if I want to go down that road just yet.
