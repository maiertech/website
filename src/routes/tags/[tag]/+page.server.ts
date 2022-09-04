import tags from '$data/tags';
import { getPosts } from '$lib/utils/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ params }) {
	const { tag: id } = params;
	// Tag is undefined when not found in tags.
	const tag = tags.find((t) => t.id === id);
	if (!tag) {
		throw error(404, `Tag '${id}' is not a valid tag.`);
	}

	// Read tagged posts (in any category that has not set `suppress` to true.
	const posts = await getPosts({ tag: id });

	return { tag, posts };
};
