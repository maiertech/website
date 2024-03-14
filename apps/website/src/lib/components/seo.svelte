<script>
	import decorate from '$lib/utils/decorate';

	/** @type {import('$lib/types').SeoData} */
	export let data;

	/**
	 * Current URL.
	 * @type {URL}
	 */
	export let url;

	/** @type {string} */
	export let canonical_origin;

	$: title = url.pathname !== '/' ? decorate(data.title) : data.title;
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta name="description" content={data.description} />
	<meta property="og:description" content={data.description} />
	{#if data.og_image_url}
		<meta property="og:image" content={data.og_image_url} />
	{/if}
	<meta property="og:url" content={`${canonical_origin}${url.pathname}`} />
	<link rel="canonical" href={data.canonical_url ?? `${canonical_origin}${url.pathname}`} />
</svelte:head>
