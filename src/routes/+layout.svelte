<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Container from '$lib/components/container.svelte';
	import Favicon from '$lib/components/favicon.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import * as Fathom from 'fathom-client';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		// Load Fathom Analytics tracking script.
		Fathom.load(import.meta.env.VITE_FATHOM_SITE_ID, {
			url: 'https://refreshing-golden-years.maier.tech/script.js',
			honorDNT: true,
			// Track only maier.tech. Also configured on app.usefathom.com.
			includedDomains: ['maier.tech']
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
