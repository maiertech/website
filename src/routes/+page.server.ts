import { latest as notes } from '$lib/server/collections/notes';
import { latest as posts } from '$lib/server/collections/posts';
import { latest as videos } from '$lib/server/collections/videos';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async function () {
	return {
		seo: {
			title: 'Thilo Maier',
			description:
				"Hi, I'm Thilo, a web developer based in Rotterdam. I write about Svelte, web development, and the web platform."
		},
		posts: posts.slice(0, 6),
		notes: notes.slice(0, 7),
		videos: videos.slice(0, 2)
	};
};
