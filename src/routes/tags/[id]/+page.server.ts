import { all as posts } from '$lib/server/collections/posts';
import { all as tags } from '$lib/server/collections/tags';
import { filterByTag } from '$lib/utils';
import type { TagMeta } from '@maiertech/sveltekit-helpers';
import { resolve } from '@maiertech/sveltekit-helpers';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async ({ params }) => {
	const tag = resolve<TagMeta>(params.id, tags);

	if (!tag) {
		return error(404, { message: 'Tag not found.' });
	}

	const taggedPosts = filterByTag(tag.id, posts);

	if (taggedPosts.length === 0) {
		error(404, `Tag ${tag.id} not found.`);
	}

	return {
		seo: { title: tag.label, description: `Posts about ${tag.label}.` },
		posts: taggedPosts
	};
};
