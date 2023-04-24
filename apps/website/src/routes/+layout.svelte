<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { PUBLIC_FATHOM_SITE_ID } from '$env/static/public';
	import Favicon from '$lib/components/favicon.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import * as Fathom from 'fathom-client';
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { Container, OpenGraphWebsite, RootLayout, SeoData } from 'ui';
	import '../app.css';

	// onMount runs client-side only.
	onMount(() => {
		Fathom.load(PUBLIC_FATHOM_SITE_ID, {
			url: 'https://refreshing-golden-years.maier.tech/script.js'
		});
	});

	// Default OpenGraph type: website.
	const is_og_type_website = writable(true);
	setContext('is_og_type_website', is_og_type_website);

	// Track page view when path changes.
	$: $page.url.pathname, browser && Fathom.trackPageview();
</script>

<SeoData data={{ title: $page.data.title, description: $page.data.description }} />
{#if $is_og_type_website}
	<OpenGraphWebsite data={{ title: $page.data.title, description: $page.data.description }} />
{/if}
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
