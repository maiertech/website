<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import { Favicon, Footer, Header } from '$lib/components';
	import { Container, PageLayout, SeoBasic } from '@maiertech/sveltekit-helpers';
	import { inject } from '@vercel/analytics';
	import type { Snippet } from 'svelte';

	import '@maiertech/sveltekit-helpers/themes/default.css'; // First import the theme, then the styles.
	import '../app.css';

	inject({ mode: dev ? 'development' : 'production' });

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

{#if $page.data.seo}
	<SeoBasic title={$page.data.seo.title} description={$page.data.seo.description} />
{/if}

<Favicon />

<svelte:head>
	<link rel="alternate" type="application/rss+xml" title="Thilo Maier" href="/rss.xml" />
</svelte:head>

<PageLayout>
	{#snippet header()}
		<Container width="lg">
			<Header></Header>
		</Container>
	{/snippet}

	<Container width="lg">
		{@render children()}
	</Container>

	{#snippet footer()}
		<Footer></Footer>
	{/snippet}
</PageLayout>
