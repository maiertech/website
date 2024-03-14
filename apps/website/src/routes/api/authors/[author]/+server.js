import { resolve } from '$lib/utils/authors';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function GET({ params }) {
	const author = resolve(params.author);

	if (!author) {
		error(404, 'Author not found.');
	}

	return json(author);
}
