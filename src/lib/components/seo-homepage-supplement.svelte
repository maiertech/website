<script>
	import serialize from '$lib/utils/serialize';

	/** @type {string} */
	export let name;

	/** @type {string} */
	export let url;

	/** @type {import('$lib/types').WebSite} */
	$: structured_data = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name,
		url
	};
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html serialize(structured_data)}
</svelte:head>
