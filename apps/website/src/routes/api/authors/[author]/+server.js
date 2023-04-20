import { resolve } from '$lib/utils/authors';
import { error, json } from '@sveltejs/kit';

export function GET({ params }) {
	const author = resolve(params.author);

	if (!author) {
		throw error(404, 'Author not found.');
	}

	return json(author);
}
