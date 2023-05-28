import { filter_by_tag } from '$lib/utils/posts';
import { resolve_tag } from '$lib/utils/tags';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const tag = resolve_tag(params.tag);

	if (!tag) {
		throw error(404, 'Not found.');
	}

	const posts = filter_by_tag(tag.id);

	if (posts.length === 0) {
		throw error(404, 'Not found.');
	}

	return { seo: { title: tag.label, description: `Posts about ${tag.label}.` }, posts };
}
