---
title: svelte-img test page
description: With this page I test rendering images in mdsvex with svelte-img.
---

<script>
  import Img from 'svelte-img';

  import src from './brooklyn-bridge.cf71a0a1f5.jpg';
</script>

This is my test image:

<Img {src} backgroundColor="#e0e0e0" />
