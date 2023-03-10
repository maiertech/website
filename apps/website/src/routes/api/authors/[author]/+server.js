import authors from '$lib/data/authors';
import { error, json } from '@sveltejs/kit';

// Resolve an author ID.
export function GET({ params }) {
	const author = authors.find((author) => author.id === params.author);

	if (!author) {
		throw error(404, 'Author not found.');
	}

	return json(author);
}
