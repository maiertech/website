import tags from '$lib/data/tags';
import { json } from '@sveltejs/kit';

/**
 * Get all tags.
 * @type {import('./$types').RequestHandler}
 */
export function GET() {
	return json(tags);
}
