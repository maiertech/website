import { sorted as videos } from '$lib/server/collections/videos.js';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	return {
		seo: {
			title: 'All videos',
			description: 'All my videos sorted by published date, the newest first.'
		},
		videos
	};
};
