<script>
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import Container from '$lib/components/container.svelte';
	import Favicon from '$lib/components/favicon.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import RootLayout from '$lib/components/root-layout.svelte';
	import Seo from '$lib/components/seo.svelte';
	import { inject } from '@vercel/analytics';
	import '../app.css';

	export let data;

	inject({ mode: dev ? 'development' : 'production' });
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
