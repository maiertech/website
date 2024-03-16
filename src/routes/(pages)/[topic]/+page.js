import { filter_by_topic } from '$lib/utils/posts';
import { resolve_topic } from '$lib/utils/topics';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const topic = resolve_topic(params.topic);

	if (!topic) {
		error(404, 'Not found.');
	}

	const posts = filter_by_topic(topic.id);

	if (posts.length === 0) {
		error(404, 'Not found.');
	}

	return { seo: { title: topic.label, description: topic.description }, posts };
}
