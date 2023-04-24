<script>
	import { page } from '$app/stores';
	import decorate from '$lib/utils/decorate';

	/** @type {import('$lib/types').SeoWebsite} */
	export let data;
</script>

<svelte:head>
	<meta property="og:type" content="website" />
	<meta
		property="og:title"
		content={$page.url.pathname !== '/' ? decorate(data.title) : data.title}
	/>
	<meta property="og:description" content={data.description} />
	<meta property="og:url" content={`${$page.url.origin}${$page.url.pathname}`} />
	{#if data.image_url}
		<meta property="og:image" content={data.image_url} />
	{/if}
</svelte:head>
