<script>
	import serialize from '$lib/utils/serialize';

	/** @type {import('zod').z.infer<typeof import('@maiertech/sveltekit-helpers').postSchema>} */
	export let data;

	/** @type {import('$lib/types').BlogPosting} */
	$: structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.title,
		image: data.ogImageUrl,
		datePublished: data.publishedDate,
		dateModified: data.lastmodDate,
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
	<meta property="article:published_time" content={data.publishedDate} />
	{#if data.lastmodDate}
		<meta property="article:modified_time" content={data.lastmodDate} />
	{/if}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html serialize(structuredData)}
</svelte:head>
