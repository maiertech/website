import type { PageServerLoad } from './$types';
import { transformPostWithLastmodDate } from '$lib/server/transformations';
import meta from './meta';

export const load: PageServerLoad = async (event) => {
	const post = await transformPostWithLastmodDate(meta, event);

	return { post };
};
