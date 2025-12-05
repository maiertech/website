import { sorted as notes } from '$lib/server/collections/notes.js';
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
