import { latest as notes } from '$lib/server/collections/notes';
import { latest as posts } from '$lib/server/collections/posts';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async function () {
	return {
		seo: {
			title: 'Thilo Maier',
			description:
				"Hi, I'm Thilo. I am a Software Engineer based in The Netherlands. I build web apps with SvelteKit and Svelte and help people take control of their digital identity."
		},
		posts: posts.slice(0, 6),
		notes: notes.slice(0, 9),
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
		]
	};
};
