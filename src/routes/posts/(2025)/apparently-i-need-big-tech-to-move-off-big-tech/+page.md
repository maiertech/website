---
title: Apparently I need Big Tech to move off Big Tech
author: thilo
publishedDate: 2025-11-06
description: TODO
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
dependency on Big Tech and a potential weaponization of this dependency in future. Wouldn't it make
sense to move my website off Big Tech and prove to the world that we can do without Big Tech in
Europe?

After a first round of diving into the world of [Hetzner](https://www.hetzner.com/) self-hosters and
[Coolify](https://coolify.io/) enthusiasts, it dawned on me that moving a hobby project off Big Tech
requires a serious time commitment. After Vercel had liberated me from DevOps, I did not want to go
back to fiddling with servers and deployment pipelines. That's when I decided to water down my
ambitions and settle for Railway as a transitional step.

Railway is technically not Big Tech, but it's also not a European company. Don't get me wrong, I
think Railway is a fantastic platform with a great team. But if they were pushed to use their
infrastructure against Europe, what choice would they have? That's why I see Railway as a stepping
stone toward something that has yet to be created in Europe.

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
broke in unexpected ways. For instance, prerendering failed on Railway builds while it worked
locally. I refactored my collections of posts and notes using
[Content Collections](https://www.content-collections.dev/). This simplified my codebase and fixed
the prerendering issues, but it was a major undertaking.

On to more problems. On Vercel, I had served my website from `www.maier.tech` and let Vercel
redirect the apex domain `maier.tech` to the `www` subdomain. Railway, however, does not support
redirects at an infrastructure level. And my European registrar does not support redirects either.
I'm already happy that they give me an `ALIAS` record. But modern DNS management with redirects? No
way. We comply with DNS standards. I thought never mind, I'll implement the redirect in SvelteKit's
`handle` function in `hooks.server.ts`. This works great, except it doesn't for prerendered pages.
Requests to prerendered pages are never routed through the `handle` hook for obvious reasons.

I started to get frustrated. I had just sorted out prerendering on Railway, and the last thing I
wanted was to turn off prerendering because a DNS registrar doesn't support redirects. But I had a
noble cause to fight for. [Bunny.net DNS](https://bunny.net/dns) to the rescue! By delegating DNS to
what is sometimes called Europe's Cloudflare alternative, I expected to be able to configure a
redirect from the apex domain to the `www` subdomain. It turns out Bunny does not support `.tech`
domains. Why? Nobody knows.

<Figure caption="Bunny DNS supports all kinds of domains except .tech domains." class="mb-8">
	<BunnyDnsImage />
</Figure>

On the verge of being defeated by European tech, I decided to play my last card: Cloudflare, the Big
Tech fallback many European websites rely on when they run into limitations of their tech stacks.
Wrap your brittle self-hosted, Coolify-powered site with Cloudflare and all is good. So I delegated
DNS to Cloudflare and set up a redirect from `www.maier.tech` to `maier.tech`. Yes, I did it this
way because I wanted to be cool and serve my website from the apex domain, even though it's off
standard in combination with CNAME recordsf. Cloudflare even throws in a Web Application Firewall,
which is great because Railway does not offer one. You do get something in return for a Big Tech
lock-in, after all.

Was it worth it? Not really. I started with Big Tech and ended with Big Tech. Did I gain anything
from this migration? Yes, my SvelteKit website now runs on adapter-node. This opens the door to
European Docker hosting when it's ready and usable in 2050.
