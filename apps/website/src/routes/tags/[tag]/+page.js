import { filter_by_tag } from '$lib/utils/posts';
import { resolve } from '$lib/utils/tags';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const tag = resolve(params.tag);

	if (!tag) {
		throw error(404, 'Not found.');
	}

	const posts = filter_by_tag(tag.id);

	if (posts.length === 0) {
		throw error(404, 'Not found.');
	}

	return { title: tag.label, description: `Posts about ${tag.label}.`, posts };
}
