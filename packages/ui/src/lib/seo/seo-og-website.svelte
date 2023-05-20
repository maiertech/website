<script>
	import decorate from '$lib/utils/decorate';

	/** @type {import('$lib/types').SeoWebsiteData} */
	export let data;

	/**
	 * Current URL.
	 * @type {URL}
	 */
	export let url;

	/**
	 * Canonical origin.
	 * Can be different from `url.origin`, e.g., during prerendering.
	 * @type {string}
	 */
	export let canonical_origin;
</script>

<svelte:head>
	<meta property="og:type" content="website" />
	<meta property="og:title" content={url.pathname !== '/' ? decorate(data.title) : data.title} />
	<meta property="og:description" content={data.description} />
	<meta property="og:url" content={`${canonical_origin}${url.pathname}`} />
	{#if data.image_url}
		<meta property="og:image" content={data.image_url} />
	{/if}
</svelte:head>
