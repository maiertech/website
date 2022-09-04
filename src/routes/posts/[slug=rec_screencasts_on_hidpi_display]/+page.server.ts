import { normalize } from '$lib/utils/posts';
import type { PageServerLoad } from './$types';
import { metadata } from './+page.svx';

export const load: PageServerLoad = async function ({ url }) {
	const post = normalize(metadata, url.pathname);
	return { post };
};
