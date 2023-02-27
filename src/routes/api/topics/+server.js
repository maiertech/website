import topics from '$lib/data/topics';
import { json } from '@sveltejs/kit';

/**
 * Get all topics.
 * @type {import('./$types').RequestHandler}
 */
export function GET() {
	return json(topics);
}
