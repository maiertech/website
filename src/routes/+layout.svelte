<script>
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import { Favicon, Footer, Header, Seo } from '$lib/components';
	import { Container, PageLayout } from '@maiertech/sveltekit-helpers';
	import { inject } from '@vercel/analytics';

	import 'open-props/borders';
	import 'open-props/fonts';
	import 'open-props/indigo';
	import 'open-props/sizes';
	import 'open-props/stone';

	import '$lib/theme.css';
	import '@maiertech/sveltekit-helpers/styles.css';

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

<PageLayout>
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
</PageLayout>
