import { ORIGIN } from '$env/static/private';
import { sorted as notes } from '$lib/server/collections/notes.js';
import { latest as latestVideos } from '$lib/server/collections/videos.js';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load: LayoutServerLoad = async ({ url }) => {
	const index = notes.findIndex((note) => note.path === url.pathname);

	if (index === -1) {
		error(404, 'Note not found.');
	}

	const note = notes[index];
	const prev = index < notes.length - 1 ? notes[index + 1] : undefined; // The higher the index the older the note.
	const next = index > 0 ? notes[index - 1] : undefined;

	const recommendedVideos = latestVideos.slice(0, 3);

	return {
		origin: ORIGIN,
		note,
		prev,
		next,
		recommendedVideos,
		seo: {
			title: note.title,
			description: note.description,
			ogImageUrl: note.ogImageUrl
		}
	};
};
