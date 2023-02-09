import { getPosts } from '$lib/utils/posts';

/** @type {import('./$types').PageServerLoad} */
export const load = async function () {
	// Don't cache files. This would break local dev.
	const posts = await getPosts({ compare: 'modified' });
	return { posts };
};
