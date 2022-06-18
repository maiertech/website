<script lang="ts">
  import { onMount } from 'svelte';
  import * as Fathom from 'fathom-client';
  import { page } from '$app/stores';
  import { browser } from '$app/env';

  import Favicon from '$lib/components/favicon.svelte';
  import Header from '$lib/components/header.svelte';
  import Container from '$lib/components/container.svelte';
  import Footer from '$lib/components/footer.svelte';
  import '../app.css';

  onMount(() => {
    // Get Fathom Analytics ready.
    Fathom.load(import.meta.env.VITE_FATHOM_SITE_ID as string, {
      url: 'https://firefly.maier.tech/script.js',
      honorDNT: true,
      includedDomains: ['maier.tech'],
    });
  });

  // Track page view when path changes.
  $: $page.url.pathname, browser && Fathom.trackPageview();
</script>

<Favicon />

<div class="layout">
  <div class="header">
    <Header />
  </div>
  <main id="skip">
    <Container maxWidth="80rem"><slot /></Container>
  </main>
  <div class="footer">
    <Footer />
  </div>
</div>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .header {
    flex-shrink: 0;
    margin-bottom: var(--size-fluid-2);
  }

  main {
    flex: 1;
    margin-bottom: var(--size-fluid-4);
  }

  .footer {
    flex-shrink: 0;
  }
</style>
