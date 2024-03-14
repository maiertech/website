import { resolve_topic } from '$lib/utils/topics';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function GET({ params }) {
	const topic = resolve_topic(params.topic);

	if (!topic) {
		error(404, 'Topic not found.');
	}

	return json(topic);
}
