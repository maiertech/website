import { filterByTag } from '$lib/utils/posts';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { TagType, PostType } from '@maiertech/sveltekit-helpers';

export const load: PageLoad = async ({ params, fetch }) => {
	let response = await fetch(`/api/tags/${params.id}`);

	// Own API: if something goes wrong, it must be a 404 error.
	if (!response.ok) {
		error(404, `Invalid tag ${params.id}.`);
	}

	const tag = (await response.json()) as TagType;

	response = await fetch('/api/posts');
	const posts = (await response.json()) as PostType[];

	const taggedPosts = filterByTag(tag.id, posts);

	if (taggedPosts.length === 0) {
		error(404, `Tag ${tag.id} not found.`);
	}

	return {
		seo: { title: tag.label, description: `Posts about ${tag.label}.` },
		posts: taggedPosts
	};
};
