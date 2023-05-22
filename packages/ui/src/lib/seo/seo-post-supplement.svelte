<script>
	import serialize from '$lib/utils/serialize';

	/** @type {import('$lib/types').ResolvedPost} */
	export let data;

	/** @type {import('$lib/types').BlogPosting} */
	$: structured_data = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.title,
		image: data.og_image_url,
		datePublished: data.published_date,
		dateModified: data.lastmod_date,
		author: data.author
			? {
					'@type': 'Person',
					name: data.author.name,
					url: data.author.url
			  }
			: undefined
	};
</script>

<svelte:head>
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={data.published_date} />
	{#if data.lastmod_date}
		<meta property="article:modified_time" content={data.lastmod_date} />
	{/if}
	{@html serialize(structured_data)}
</svelte:head>
