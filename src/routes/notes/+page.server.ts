import { all as notes } from '$lib/server/collections/notes';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	return {
		seo: {
			title: 'All notes',
			description: 'All my notes sorted by published date, the newest first.'
		},
		notes
	};
};
