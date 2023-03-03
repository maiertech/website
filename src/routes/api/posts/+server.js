import posts from '$lib/data/posts';
import { json } from '@sveltejs/kit';

export const prerender = true;

/**
 * Get all authors.
 * @type {import('./$types').RequestHandler}
 */
export function GET() {
	return json(posts);
}
