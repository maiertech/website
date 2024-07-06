import { tags } from '$lib/data';
import { filterByTag } from '$lib/utils/posts';
import { resolve } from '@maiertech/sveltekit-helpers';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const tag = resolve(params.tag, tags);

	if (!tag) {
		error(404, 'Not found.');
	}

	const posts = filterByTag(tag.id);

	if (posts.length === 0) {
		error(404, 'Not found.');
	}

	return { seo: { title: tag.label, description: `Posts about ${tag.label}.` }, posts };
}
