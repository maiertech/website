import { resolve as resolve_author } from '$lib/utils/authors';
import { top_posts } from '$lib/utils/posts';
import { resolve_tags } from '$lib/utils/tags';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export function load() {
	const posts = top_posts(3).map((post) => {
		return {
			...post,
			author: post.author ? resolve_author(post.author) : undefined,
			tags: post.tags ? resolve_tags(post.tags) : undefined
		};
	});
	return {
		seo: {
			title: 'Thilo Maier',
			description:
				"Hi, I'm Thilo. I am a developer based in Rotterdam, NL. I build web apps with SvelteKit and Svelte and keep improving my developer happiness."
		},
		topics: [
			{
				label: 'Svelte',
				description:
					'I build web apps with Svelte, the framework that puts the fun back into web development.',
				path: '/tags/svelte'
			},
			{
				label: 'Data visualization',
				description:
					'I create data visualizations with Svelte and D3 to go from data to insights faster.',
				path: '/tags/data-visualization'
			},
			{
				label: 'Developer happiness',
				description: 'I write about services and tools that improve my developer happiness.',
				path: '/tags/dx'
			},
			{
				label: 'Web fundamentals',
				description: "Web APIs are Svelte's foundation. Brush up on the fundamentals, they say.",
				path: '/tags/web-fundamentals'
			},
			{
				label: 'Content creation',
				description:
					'I share what I learn about content creation. Writing posts, crafting posts on Mastodon, and recording screencasts.',
				path: '/tags/content-creation'
			}
		],
		posts
	};
}
