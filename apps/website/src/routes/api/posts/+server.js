import posts from '$lib/data/posts';
import { json } from '@sveltejs/kit';

export const prerender = true;

// Get all authors.
export function GET() {
	return json(posts);
}
