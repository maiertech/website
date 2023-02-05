import { normalize } from '$lib/utils/posts';
import { metadata } from './+page.svx';

/** @type {import('./$types').PageServerLoad} */
export const load = async function ({ url }) {
	const post = normalize(metadata, url.pathname);
	return { post };
};
