import { ORIGIN } from '$env/static/private';
import { all as notes } from '$lib/server/collections/notes';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load: LayoutServerLoad = async ({ url }) => {
	const note = notes.find((note) => note.path === url.pathname);

	if (!note) {
		error(404, 'Note not found.');
	}

	return {
		origin: ORIGIN,
		note,
		seo: note
			? { title: note.title, description: note.description, ogImageUrl: note.ogImageUrl }
			: undefined
	};
};
