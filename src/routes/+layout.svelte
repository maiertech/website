<script>
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import { Favicon, Footer, Header } from '$lib/components';
	import { Container, PageLayout, SeoBasic } from '@maiertech/sveltekit-helpers';
	import { inject } from '@vercel/analytics';

	import 'open-props/borders';
	import 'open-props/fonts';
	import 'open-props/indigo';
	import 'open-props/sizes';
	import 'open-props/stone';

	import '$lib/theme.css';
	import '@maiertech/sveltekit-helpers/styles.css';

	inject({ mode: dev ? 'development' : 'production' });
</script>

{#if $page.data.seo?.title && $page.data.seo?.description}
	<SeoBasic title={$page.data.seo.title} description={$page.data.seo.description} />
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
