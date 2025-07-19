<script lang="ts">
	import { page } from '$app/state';
	import { Favicon, Footer, Header } from '$lib/components';
	import { Container, PageLayout, SeoBasic, SeoOgImage } from '@maiertech/sveltekit-helpers';
	import type { LayoutProps } from './$types';

	import '@maiertech/sveltekit-helpers/themes/default.css'; // First import the theme, then the styles.
	import '../app.css';

	let { data, children }: LayoutProps = $props();
</script>

{#if page.data.seo}
	<SeoBasic title={page.data.seo.title} description={page.data.seo.description} />
	{#if page.data.seo.ogImageUrl}
		<SeoOgImage ogImageUrl={page.data.seo.ogImageUrl} />
	{:else}
		<SeoOgImage ogImageUrl={data.defaultOgImageUrl} />
	{/if}
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
