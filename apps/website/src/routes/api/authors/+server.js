import authors from '$lib/data/authors';
import { json } from '@sveltejs/kit';

// Get all authors.
export function GET() {
	return json(authors);
}
