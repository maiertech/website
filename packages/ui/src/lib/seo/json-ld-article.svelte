<script>
	import serialize_schema from '$lib/utils/serialize-schema';

	/** @type {import('$lib/types').SeoAuthor | undefined} */
	export let author = undefined;

	/** @type {import('$lib/types').SeoPost} */
	export let data;

	/** @type {import('schema-dts').BlogPosting} */
	const structured_data = {
		'@type': 'BlogPosting',
		headline: data.title,
		image: data.image_url,
		datePublished: data.published_date,
		dateModified: data.lastmod_date,
		author: author
			? {
					'@type': 'Person',
					name: author.name,
					url: author.url
			  }
			: undefined
	};
</script>

<svelte:head>
	{@html serialize_schema(structured_data)}
</svelte:head>
