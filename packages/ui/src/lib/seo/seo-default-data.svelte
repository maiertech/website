<script>
	import decorate from '$lib/utils/decorate';

	/** @type {import('$lib/types').SeoDefaultData} */
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
	<title>{url.pathname !== '/' ? decorate(data.title) : data.title}</title>
	<meta name="description" content={data.description} />
	<link rel="canonical" href={data.canonical_url ?? `${canonical_origin}${url.pathname}`} />
</svelte:head>
