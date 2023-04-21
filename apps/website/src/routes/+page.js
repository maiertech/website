import { TopicSchema } from '$lib/schemas';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

export const prerender = true;

export async function load({ fetch }) {
	const response = await fetch('/api/topics');

	if (!response.ok) {
		throw error(500, 'Failed to fetch topics.');
	}

	// Validate topics.
	const result = z.array(TopicSchema).safeParse(await response.json());

	if (!result.success) {
		throw error(500, 'Topics failed validation.');
	}

	const topics = result.data;

	return {
		title: 'Thilo Maier',
		description:
			"Hi, I'm Thilo. I am a developer based in Rotterdam, NL. I build web apps with SvelteKit and Svelte and keep improving my developer happiness.",
		topics
	};
}
