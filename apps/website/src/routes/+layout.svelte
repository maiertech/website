<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Favicon from '$lib/components/favicon.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import * as Fathom from 'fathom-client';
	import { onMount } from 'svelte';
	import { Container, RootLayout } from 'ui';
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

<svelte:head>
	<link rel="alternate" type="application/rss+xml" title="Thilo Maier" href="/rss.xml" />
</svelte:head>

<RootLayout>
	<svelte:fragment slot="header">
		<Container>
			<Header />
		</Container>
	</svelte:fragment>

	<Container>
		<slot />
	</Container>

	<svelte:fragment slot="footer">
		<Footer />
	</svelte:fragment>
</RootLayout>
