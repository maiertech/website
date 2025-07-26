import { resolveNote } from '$lib/server/resolvers';
import type { PageServerLoad } from './$types';
import meta from './meta';

export const load: PageServerLoad = async () => {
	const note = await resolveNote(meta);
	const { title, description, ogImageUrl } = note;
	return {
		note,
		seo: { title, description, ogImageUrl }
	};
};
