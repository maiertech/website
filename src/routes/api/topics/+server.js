import topics from '$lib/data/topics';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

export const prerender = false;

const PayloadSchema = z.array(z.string());

/**
 * Get all topics.
 * @type {import('./$types').RequestHandler}
 */
export function GET() {
	return json(topics);
}

/**
 * Resolve an array of topic IDs.
 * @type {import('./$types').RequestHandler}
 */
export async function POST({ request }) {
	const result = PayloadSchema.safeParse(await request.json());

	if (!result.success) {
		throw error(400, 'Payload validation failed.');
	}

	const topic_ids = result.data;

	// Resolve topic IDs (preserve order).
	const resolvedTopics = topic_ids.map((topic) => topics.find((t) => t.id === topic));

	return json(resolvedTopics);
}
