import authors from '$lib/data/authors';
import { json } from '@sveltejs/kit';

/**
 * Get all authors.
 * @type {import('./$types').RequestHandler}
 */
export function GET() {
	return json(authors);
}
