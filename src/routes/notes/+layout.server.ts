import type { LayoutServerLoad } from './$types';
import { ORIGIN } from '$env/static/private';
import { allNotes } from 'content-collections';

// TODO: Enable prerendering once all content collections are in place.
// export const prerender = true;

export const load: LayoutServerLoad = async ({ route }) => {
	const notePath = route.id?.replace(/\/\(2025\)/, '') || '';
	const note = allNotes.find((note) => note.path === notePath);

	return {
		origin: ORIGIN,
		note,
		seo: note
			? { title: note.title, description: note.description, ogImageUrl: note.ogImageUrl }
			: undefined
	};
};
