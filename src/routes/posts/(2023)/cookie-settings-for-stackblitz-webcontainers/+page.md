---
title: Cookie settings for StackBlitz WebContainers
author: thilo
publishedDate: 2023-02-10
description:
  StackBlitz WebContainers require third-party cookies. Learn how to enable them or allow specific
  sites for embedded live code to function.
tags:
  - productivity
---

<script>
  import { Figure } from '@maiertech/sveltekit-helpers'
  import CookiesNotEnabledImage from './CookiesNotEnabledImage.svelte'
  import AlwaysAllowCookiesImage from './AlwaysAllowCookiesImage.svelte'
</script>

More and more websites use StackBlitz WebContainers to embed live code examples. The new Svelte
tutorial at [learn.svelte.dev](https://learn.svelte.dev/) embeds StackBlitz WebContainers to run
Svelte and SvelteKit examples in supported browsers. Think of a WebContainer as a small operating
system that runs in your browser and can run Node.js version 16. Once you have Node.js running in
your browser, it takes little effort to run entire Node-based stacks, e.g.,
[SvelteKit](https://kit.svelte.dev/), natively in your browser.

I experimented with embedded WebContainers in my post
[Exploring frequently used methods of d3-array](/posts/exploring-frequently-used-methods-of-d3-array).
The first catch with WebContainers is that they are
[not yet supported in all browsers](https://developer.stackblitz.com/platform/webcontainers/browser-support).
Currently, Chrome and Firefox support WebContainers, but Safari does not.

The second catch is that embedded WebContainers need third-party cookies enabled to work. If your
audience is technical, there is a high chance that they are also security-conscious and have
third-party cookies disabled. When they see an embedded WebContainer in their browser, they see this
warning:

<Figure caption="A StackBlitz WebContainer rendered in a Chromium-based browser with third-party cookies disabled." class="mb-8">
	<CookiesNotEnabledImage />
</Figure>

The problem with this warning is that you cannot fix it for your users. Every user has to fix it in
their browser, either by enabling third-party cookies for all sites or by always allowing cookies
for these two sites:

<Figure caption="To make embedding WebContainers work without allowing third-party cookies for all sites, you must always allow cookies for these two URL patterns." class="mb-8">
	<AlwaysAllowCookiesImage />
</Figure>

For StackBlitz [Codeflow Beta](https://stackblitz.com/codeflow/beta), which I discussed in my post
[Is StackBlitz Codeflow Beta ready to replace your local VSCode?](/posts/is-stackblitz-codeflow-beta-ready-to-replace-your-local-vs-code),
you have to add `[*.]staticblitz.com` to the above list to make it work without enabling third-party
cookies. Check out the
[StackBlitz documentation](https://developer.stackblitz.com/platform/webcontainers/browser-config)
for more details on configuring third-party cookies in different browsers.
