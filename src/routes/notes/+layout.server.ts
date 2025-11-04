import { ORIGIN } from '$env/static/private';
import { all as notes } from '$lib/server/collections/notes';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load: LayoutServerLoad = async ({ url }) => {
	const note = notes.find((note) => note.path === url.pathname);

	return {
		origin: ORIGIN,
		note,
		seo: note
			? { title: note.title, description: note.description, ogImageUrl: note.ogImageUrl }
			: undefined
	};
};
