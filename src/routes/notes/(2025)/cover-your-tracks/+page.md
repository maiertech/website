---
title: Cover Your Tracks
description:
  Test your browser's protection against fingerprinting with the EFF's Cover Your Tracks tool.
  Safari outperforms Chromium.
publishedDate: 2025-10-25
link: https://coveryourtracks.eff.org/
---

<script>
  import { Figure } from '@maiertech/sveltekit-helpers';
  import HeliumImage from './HeliumImage.svelte';
  import SafariImage from './SafariImage.svelte';
</script>

The [EFF](https://www.eff.org/) has a website to check whether your browser protects you from being
tracked through fingerprinting. Fingerprinting is a tracking technique that collects unique details
about your device and browser settings to create a profile that identifies you across websites
without using cookies.

On the Cover Your Tracks website, you can test if your browser does enough to protect you from being
fingerprinted. I was surprised to see that Safari handles this much better than Chromium. In my
case, I tested a de-Googled Helium browser with [uBlock Origin](https://ublockorigin.com/).

Helium users are vulnerable to being fingerprinted:

<Figure caption="The Cover Your Tracks result for Helium with uBlock Origin. Users can be tracked through fingerprinting." class="mb-8">
  <HeliumImage />
</Figure>

Safari, on the other hand, protects users with a randomized fingerprint:

<Figure caption="The Cover Your Tracks result for Safari on macOS. Users are better protected from fingerprinting." class="mb-8">
  <SafariImage />
</Figure>

On macOS, Safari is the better choice for everyday browsing.
