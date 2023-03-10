import tags from '$lib/data/tags';
import { json } from '@sveltejs/kit';

// Get all tags.
export function GET() {
	return json(tags);
}
