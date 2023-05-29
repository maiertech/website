<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { PUBLIC_FATHOM_SITE_ID } from '$env/static/public';
	import Favicon from '$lib/components/favicon.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import * as Fathom from 'fathom-client';
	import { onMount } from 'svelte';
	import { Container, RootLayout, Seo } from 'ui';
	import '../app.css';

	// onMount runs client-side only.
	onMount(() => {
		Fathom.load(PUBLIC_FATHOM_SITE_ID);
	});

	export let data;

	// Track page view when path changes.
	$: $page.url.pathname, browser && Fathom.trackPageview();
</script>

{#if !$page.error}
	<Seo url={$page.url} canonical_origin={data.canonical_origin} data={$page.data.seo} />
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
