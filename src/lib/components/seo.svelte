<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { BASE_URL } from '$lib/data/site';

	// Every page.
	export let title: string;
	export let description: string;
	export let canonicalUrl: string | undefined = undefined;

	// Posts.
	export let topics: string[] = [];
	export let tags: string[] = [];
	export let published: string | undefined = undefined;
	export let modified: string | undefined = undefined;

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
