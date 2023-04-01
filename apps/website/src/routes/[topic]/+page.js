import { PostSchema, TopicSchema } from '$lib/schemas';
import { z } from 'zod';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const { topic } = params;

	// Resolve topic.
	let response = await fetch(`/api/topics/${topic}`);

	if (!response.ok) {
		throw error(404, 'Not found.');
	}

	let result_topic = TopicSchema.safeParse(await response.json());

	if (!result_topic.success) {
		throw error(500, `Topic ${topic} failed validation.`);
	}

	const resolved_topic = result_topic.data;

	// Fetch posts for topic.
	response = await fetch(
		`/api/posts/filter?${new URLSearchParams({
			topic: resolved_topic.id
		}).toString()}`
	);

	if (!response.ok) {
		throw error(500, `Failed to fetch posts for topic ${resolved_topic.label}.`);
	}

	const result_posts = z.array(PostSchema).safeParse(await response.json());

	if (!result_posts.success) {
		throw error(500, `Posts for topic ${resolved_topic.label} failed validation.`);
	}

	const posts = result_posts.data;

	if (posts.length === 0) {
		throw error(404, 'Not found.');
	}

	return { title: resolved_topic.label, description: resolved_topic.description, posts };
}
