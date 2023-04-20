import { resolve } from '$lib/utils/tags';
import { error, json } from '@sveltejs/kit';

export async function GET({ params }) {
	const tag = resolve(params.tag);

	if (!tag) {
		throw error(404, 'Tag not found.');
	}

	return json(tag);
}
