import { sorted as posts } from '$lib/server/collections/posts.js';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	return {
		seo: {
			title: 'All posts',
			description: 'All my posts sorted by published date, the newest first.'
		},
		posts
	};
};
