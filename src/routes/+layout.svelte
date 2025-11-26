<script lang="ts">
	import { page } from '$app/state';
	import { Favicon, Footer } from '$lib/components';
	import { Container, SeoBasic, SeoOgImage, SiteHeader } from '@maiertech/sveltekit-helpers';
	import { ModeWatcher } from 'mode-watcher';
	import type { LayoutProps } from './$types';
	import src from '$lib/assets/thilo.jpg?enhanced';

	import '../app.css';

	let { children, data }: LayoutProps = $props();
</script>

{#if page.data.seo}
	<SeoBasic title={page.data.seo.title} description={page.data.seo.description} />
	{#if page.data.seo.ogImageUrl}
		<SeoOgImage src={page.data.seo.ogImageUrl} />
	{/if}
{/if}

<Favicon />

<ModeWatcher defaultTheme="maiertech" />

<svelte:head>
	<link rel="alternate" type="application/rss+xml" title="Thilo Maier" href="/rss.xml" />
	<link
		rel="alternate"
		type="application/rss+xml"
		title="Thilo Maier (posts)"
		href="/posts/rss.xml"
	/>
	<link
		rel="alternate"
		type="application/rss+xml"
		title="Thilo Maier (notes)"
		href="/notes/rss.xml"
	/>
</svelte:head>

<div class="flex min-h-screen flex-col gap-8 sm:gap-10 lg:gap-12">
	<SiteHeader
		links={[
			{ text: 'Posts', href: '/posts' },
			{ text: 'Notes', href: '/notes' }
		]}
		class="shrink-0"
	>
		{#snippet logo()}
			<div class="flex items-center gap-3 py-2 text-primary">
				<enhanced:img {src} alt="Thilo's avatar." class="size-8 rounded-full" />
				<div class="text-2xl font-bold">Thilo Maier</div>
			</div>
		{/snippet}
	</SiteHeader>

	<Container width="lg" class="flex-1">
		{@render children()}
	</Container>

	<Footer commitHash={data.commitHash}></Footer>
</div>
