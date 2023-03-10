import tags from '$lib/data/tags';
import { error, json } from '@sveltejs/kit';

// Resolve a tag ID.
export async function GET({ params }) {
	const tag = tags.find((tag) => tag.id === params.tag);

	if (!tag) {
		throw error(404, 'Tag not found.');
	}

	return json(tag);
}
