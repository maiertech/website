import { latest as notes } from '$lib/server/collections/notes';
import { latest as posts } from '$lib/server/collections/posts';
import { latest as videos } from '$lib/server/collections/videos';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async function () {
	return {
		seo: {
			title: 'Thilo Maier',
			description: "It's a wild time to be a web developer."
		},
		posts: posts.slice(0, 6),
		notes: notes.slice(0, 8),
		videos: videos.slice(0, 3)
	};
};
