export function load() {
	return { examples, links };
}

const links = [
	{ title: 'rel=canonical: the ultimate guide (Yoast)', href: 'https://yoast.com/rel-canonical/' },
	{
		title: 'Canonical Tags: A Simple Guide for Beginners (Ahrefs)',
		href: 'https://ahrefs.com/blog/canonical-tags/'
	},
	{
		title: 'The canonical link is king (Fathom Analytics)',
		href: 'https://usefathom.com/support/canonical-links'
	},
	{
		title: 'Consolidate duplicate URLs (Google Search Central)',
		href: 'https://developers.google.com/search/docs/advanced/crawling/consolidate-duplicate-urls'
	},
	{
		title: 'Avoid creating duplicate content (Google Search Central)',
		href: 'https://developers.google.com/search/docs/advanced/guidelines/duplicate-content'
	}
];

const examples = {
	'src/app.html': `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width" />
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>`,

	'seo-default-data.svelte': `<script>
	import { PUBLIC_CANONICAL_ORIGIN } from '$env/static/public';
	import { page } from '$app/stores';
	import decorate from '$lib/utils/decorate';

	/** @type {import('$lib/types').SeoDefaultData} */
	export let data;
</script>

<svelte:head>
	<title>{$page.url.pathname !== '/' ? decorate(data.title) : data.title}</title>
	<meta name="description" content={data.description} />
	<link rel="canonical" href={data.canonical_url ?? \`\${PUBLIC_CANONICAL_ORIGIN}\${$page.url.pathname}\`} />
</svelte:head>`,

	'src/lib/utils/decorate.js': `/**
 * Decorate SEO title.
 * @param {string} title
 */
export default function (title) {
	return \`\${title} – Thilo Maier\`;
}`,

	'src/routes/+page.js': `export function load() {
	return {
		title: 'Thilo Maier',
		description:
			"Hi, I'm Thilo. I am a developer based in Rotterdam, NL. I build web apps with SvelteKit and Svelte and keep improving my developer happiness."
	};
}`,
	'src/routes/+layout.svelte': `<script>
	import { page } from '$app/stores';
	import { PUBLIC_CANONICAL_ORIGIN } from '$env/static/public';
	import { SeoComponent } from '$lib/seo';
	import '../app.css';
</script>

<SeoComponent
	url={$page.url}
	canonical_origin={PUBLIC_CANONICAL_ORIGIN}
	data={{ title: $page.data.title, description: $page.data.description }}
/>

<div>Homepage</div>`
};
