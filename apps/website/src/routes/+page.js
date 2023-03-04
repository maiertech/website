import { error } from '@sveltejs/kit';
import { TopicsSchema } from '$lib/schemas/content';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch('/api/topics');

	if (!response.ok) {
		throw error(500, 'Failed to fetch topics.');
	}

	// Validate topics.
	const result = TopicsSchema.safeParse(await response.json());

	if (!result.success) {
		throw error(500, 'Topics failed validation.');
	}

	const topics = result.data;

	return {
		title: 'Thilo Maier',
		description:
			"Hi, I'm Thilo. I am a developer based in Rotterdam, The Netherlands. I build web apps with SvelteKit and Svelte and keep improving my developer happiness.",
		topics
	};
}
