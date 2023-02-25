import { PostsSchema, TopicsSchema } from '$lib/schemas/content';
import { error } from '@sveltejs/kit';

export const prerender = 'auto';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const { topic } = params;

	// Resolve topic.
	let response = await fetch('/api/topics', { method: 'POST', body: JSON.stringify([topic]) });

	if (!response.ok) {
		throw error(404, 'Not found.');
	}

	// Validate topic.
	let result_topic = TopicsSchema.safeParse(await response.json());

	if (!result_topic.success) {
		throw error(500, `Topic ${topic} failed validation.`);
	}

	const [resolved_topic] = result_topic.data;

	// Fetch posts for topic.
	response = await fetch('/', {
		method: 'POST',
		body: JSON.stringify({ topics: [resolved_topic.id] })
	});

	if (!response.ok) {
		throw error(500, `Failed to fetch posts for topic ${resolved_topic.label}.`);
	}

	// Validate posts.
	const result_posts = PostsSchema.safeParse(await response.json());

	if (!result_posts.success) {
		throw error(500, `Posts for topic ${resolved_topic.label} failed validation.`);
	}

	const posts = result_posts.data;

	if (posts.length === 0) {
		throw error(404, 'Not found.');
	}

	return { title: resolved_topic.label, description: resolved_topic.description, posts };
}
