import topics from '$lib/data/topics';
import { json } from '@sveltejs/kit';

// Get all topics.
export function GET() {
	return json(topics);
}
