import { resolvePost } from '$lib/server/resolvers';
import type { PageServerLoad } from './$types';
import meta from './meta';

export const load: PageServerLoad = async () => {
	const post = await resolvePost({ postMeta: meta });
	const { title, description, ogImageUrl } = post;

	return { post, seo: { title, description, ogImageUrl } };
};
