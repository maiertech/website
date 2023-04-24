<script>
	/** @type {import('$lib/types').SeoAuthor | undefined} */
	export let author = undefined;

	/** @type {import('$lib/types').SeoPost} */
	export let data;

	const structured_data = {
		'@context': 'https://schema.org',
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
	{@html `<script type="application/ld+json">
${JSON.stringify(structured_data, null, 2)}
</script>`}
</svelte:head>
