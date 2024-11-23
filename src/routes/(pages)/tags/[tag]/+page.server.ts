import { getPosts, getTags } from '$lib/server/data';
import { filterByTag } from '$lib/utils/posts';
import { resolve } from '@maiertech/sveltekit-helpers';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (({ params }) => {
	const tag = resolve(params.tag, getTags());

	if (!tag) {
		error(404, 'Not found.');
	}

	const posts = filterByTag(tag.id, getPosts());

	if (posts.length === 0) {
		error(404, 'Not found.');
	}

	return { seo: { title: tag.label, description: `Posts about ${tag.label}.` }, posts };
}) satisfies PageServerLoad;
