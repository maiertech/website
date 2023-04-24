<script>
	import { page } from '$app/stores';
	import decorate from '$lib/utils/decorate';

	/** @type {import('$lib/types').SeoDefault} */
	export let data;
</script>

<svelte:head>
	<title>{$page.url.pathname !== '/' ? decorate(data.title) : data.title}</title>
	<meta name="description" content={data.description} />
	<link rel="canonical" href={data.canonical_url ?? `${$page.url.origin}${$page.url.pathname}`} />
</svelte:head>
