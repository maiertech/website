import { resolve_tag } from '$lib/utils/tags';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const tag = resolve_tag(params.tag);

	if (!tag) {
		throw error(404, 'Tag not found.');
	}

	return json(tag);
}
