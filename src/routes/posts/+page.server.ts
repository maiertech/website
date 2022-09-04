import { getPosts } from '$lib/utils/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function () {
	// Don't cache files. This would break local dev.
	const posts = await getPosts({ compare: 'modified' });

	return { posts };
};
