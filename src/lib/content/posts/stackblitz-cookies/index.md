---
id: stackblitz-cookies
title: Cookie settings for StackBlitz WebContainers
author: thilo
published: 2023-02-10
modified: 2023-02-14
description: Your browser needs to have third-party cookies enabled when you look at live-code examples embedded with StackBlitz WebContainers. Alternatively, you can allow specific URL patterns to always use cookies. This post describes how embedded WebContainers work in your browser without allowing third-party cookies for all sites.
topics: [dx]
tags: [stackblitz]
---

<script>
  import Image from '$lib/components/image.svelte';
</script>

More and more websites use StackBlitz WebContainers to embed live-code examples. The new Svelte tutorial at [learn.svelte.dev](https://learn.svelte.dev/) embeds StackBlitz WebContainers to run Svelte and SvelteKit examples in supported browsers. Think of a WebContainer as a small operating system that runs in a browser and can run Node.js version 16. Once you have Node.js running in your browser, it takes little effort to run entire Node-based stacks, e.g., SvelteKit, natively in a browser.

I experimented with embedded WebContainers in my post [Exploring frequently used methods of d3-array](https://maier.tech/posts/exploring-frequently-used-methods-of-d3-array). The first catch with WebContainers is that they are [not yet supported in all browsers](https://developer.stackblitz.com/platform/webcontainers/browser-support). Currently, Chrome and Firefox support WebContainers, but Safari does not.

The second catch is that embedded WebContainers need third-party cookies enabled to work. If your audience is technical, there is a high chance that they are also security-conscious and have third-party cookies disabled. When they see an embedded WebContainer in a browser, they see this warning:

<figure>
<Image
  ratio={1672/736}
  alt="Screenshot of an embedded StackBlitz WebContainer with warning message 'Enable third-party cookies'."
  url="https://share.mailbox.org/ajax/share/01028db20d4f100618142d9d4f104349a5bd8f225863157c/1/8/MjQy/MjQyLzM1Mg?dl=true"
  loading="lazy" />
<figcaption>A StackBlitz WebContainer rendered in a Chromium-based browser with third-party cookies disabled.</figcaption>
</figure>

The problem with this warning is that you cannot fix it for your users. Every user has to fix it in their browser. Either by enabling third-party cookies for all sites or by always allowing cookies for these two sites:

<figure>
<Image
  ratio={1372/426}
  alt="Screenshot of the cookies settings in a Chromium-based browser. Section 'Sites that can always use cookies' lists [*.]stackblitz.io and [*.]webcontainer.io."
  url="https://share.mailbox.org/ajax/share/00be9d910b34770803d52fab34774f318badc952ab2cb1c2/1/8/MjQy/MjQyLzM1OA?dl=true"
  loading="lazy" />
<figcaption>To make embedding WebContainers work without allowing third-party cookies for all sites, you must always allow cookies for these two URL patterns.</figcaption>
</figure>

For StackBlitz [Codeflow Beta](https://stackblitz.com/codeflow/beta), which I discussed in my post [Is StackBlitz Codeflow Beta ready to replace your local VS Code?](https://maier.tech/posts/is-stackblitz-codeflow-beta-ready-to-replace-your-local-vs-code), you have to add `[*.]staticblitz.com` to the above list to make it work without enabling third-party cookies. Check out the [StackBlitz documentation](https://developer.stackblitz.com/platform/webcontainers/browser-config) for more details on configuring third-party cookies in different browsers.
