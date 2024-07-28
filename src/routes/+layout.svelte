<script>
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import { Favicon, Footer, Header } from '$lib/components';
	import {
		Container,
		PageLayout,
		SeoBasic,
		SeoCanonicalUrl,
		SeoOgImage
	} from '@maiertech/sveltekit-helpers';
	import { inject } from '@vercel/analytics';
	import { PUBLIC_CANONICAL_ORIGIN } from '$env/static/public';

	import 'open-props/borders';
	import 'open-props/fonts';
	import 'open-props/indigo';
	import 'open-props/sizes';
	import 'open-props/stone';

	import '$lib/theme.css';
	import '@maiertech/sveltekit-helpers/styles.css';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<SeoBasic title={$page.data.seo.title} description={$page.data.seo.description} />
<SeoCanonicalUrl origin={PUBLIC_CANONICAL_ORIGIN} canonicalUrl={$page.data.seo.canonical_url} />
{#if $page.data.seo.og_image_url}
	<SeoOgImage ogImageUrl={$page.data.seo.og_image_url} />
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
