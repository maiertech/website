import { resolve_topic } from '$lib/utils/topics';
import { error, json } from '@sveltejs/kit';

export function GET({ params }) {
	const topic = resolve_topic(params.topic);

	if (!topic) {
		throw error(404, 'Topic not found.');
	}

	return json(topic);
}
