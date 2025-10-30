import { all as tags } from '$lib/server/collections/tags';
import { filterByTag } from '$lib/utils';
import type { ResolvedPost, Tag } from '@maiertech/sveltekit-helpers';
import { resolve } from '@maiertech/sveltekit-helpers';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// TODO: turn prerendering back on after posts have been migrated to a content-collection.
// export const prerender = true;

export const load: PageServerLoad = async ({ params, fetch }) => {
	const tag = resolve<Tag>(params.id, tags);

	if (!tag) {
		return error(404, { message: 'Tag not found.' });
	}

	const response = await fetch('/api/posts/all');
	const posts = (await response.json()) as ResolvedPost[];

	const taggedPosts = filterByTag(tag.id, posts);

	if (taggedPosts.length === 0) {
		error(404, `Tag ${tag.id} not found.`);
	}

	return {
		seo: { title: tag.label, description: `Posts about ${tag.label}.` },
		posts: taggedPosts
	};
};
