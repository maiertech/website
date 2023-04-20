import { error } from '@sveltejs/kit';
import { resolve } from '$lib/utils/topics';
import { filter_by_topic } from '$lib/utils/posts';

export async function load({ params }) {
	const topic = resolve(params.topic);

	if (!topic) {
		throw error(404, 'Not found.');
	}

	const posts = filter_by_topic(topic.id);

	if (posts.length === 0) {
		throw error(404, 'Not found.');
	}

	return { title: topic.label, description: topic.description, posts };
}
