<script lang="ts">
  import { onMount } from 'svelte';
  import * as Fathom from 'fathom-client';
  import { page } from '$app/stores';
  import { browser } from '$app/env';

  import Header from '$lib/components/header.svelte';
  import Container from '$lib/components/container.svelte';
  import Footer from '$lib/components/footer.svelte';
  import '../app.css';

  onMount(() => {
    Fathom.load(import.meta.env.VITE_FATHOM_SITE_ID as string, {
      url: 'https://firefly.maier.tech/script.js',
      honorDNT: true,
      includedDomains: ['maier.tech'],
    });
  });

  // Track page view when path changes.
  $: $page.url.pathname, browser && Fathom.trackPageview();
</script>

<!-- Wrapped in flex #svelte div. -->
<div class="flex-shrink-0 mb-3 md:mb-6">
  <Header />
</div>
<main id="skip" class="flex-1 mb-8 md:mb-12">
  <Container><slot /></Container>
</main>
<div class="flex-shrink-0">
  <Footer />
</div>
