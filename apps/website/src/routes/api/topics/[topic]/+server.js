import topics from '$lib/data/topics';
import { error, json } from '@sveltejs/kit';

// Resolve a topic ID.
export function GET({ params }) {
	const topic = topics.find((topic) => topic.id === params.topic);

	if (!topic) {
		throw error(404, 'Topic not found.');
	}

	return json(topic);
}
