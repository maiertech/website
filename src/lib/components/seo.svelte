<script>
	import SvelteSeo from 'svelte-seo';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { BASE_URL } from '$lib/data/site';

	// Every page.

	/** @type {string} */
	export let title;

	/** @type {string} */
	export let description;

	/** @type {string | undefined} */
	export let canonicalUrl = undefined;

	// Posts.

	/** @type {string[]} */
	export let topics = [];

	/** @type {string[]} */
	export let tags = [];

	/** @type {string | undefined} */
	export let published = undefined;

	/** @type {string | undefined} */
	export let modified = undefined;

	let decoratedTitle = title;
	if ($page.url.pathname !== `${base}/`) {
		decoratedTitle = `${title} – Thilo Maier`;
	}
	const url = canonicalUrl ?? `${BASE_URL}${$page.url.pathname}`;
</script>

<SvelteSeo
	title={decoratedTitle}
	{description}
	canonical={url}
	openGraph={{
		title,
		description,
		url,
		article: {
			publishedTime: published,
			modifiedTime: modified,
			tags: [...topics, ...tags]
		}
	}}
	twitter={{ title, description }}
/>
