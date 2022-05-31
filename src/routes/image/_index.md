---
title: Responsive image
description: Render a responsive image with Image component
---

<!-- <script context="module">
  export const hydrate = false;
</script> -->

<script>
  import Image from '$lib/components/image.svelte';
  import SvelteImage from 'svelte-img';

  // Provided by page endpoint.
  export let images;

  const ratio = 16/9;
</script>

My image component:

<Image alt="Brooklyn Bridge at dawn." src={images[`brooklyn-bridge`].src}
srcset={images[`brooklyn-bridge`].srcset} />

svelte-img:

<!-- <SvelteImage alt="Brooklyn Bridge at dawn." src={images[`brooklyn-bridge`].src}
backgroundColor="#e0e0e0" ratio="1x1"/> -->
