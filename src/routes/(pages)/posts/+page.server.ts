import { getPosts } from '$lib/server/data';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		seo: {
			title: 'All posts',
			description: 'All my posts sorted by published date, the newest first.'
		},
		posts: getPosts()
	};
}) satisfies PageServerLoad;
