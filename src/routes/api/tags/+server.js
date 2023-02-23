import tags from '$lib/data/tags';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

export const prerender = false;

/**
 * Get all tags.
 * @type {import('./$types').RequestHandler}
 */
export function GET() {
	return json(tags);
}

const PayloadSchema = z.array(z.string());

/**
 * Resolve an array of tag IDs.
 * @type {import('./$types').RequestHandler}
 */
export async function POST({ request }) {
	// Validate payload.
	const result = PayloadSchema.safeParse(await request.json());

	if (!result.success) {
		throw error(400, 'Payload validation failed.');
	}

	const tag_ids = result.data;

	// Resolve tag IDs (preserve order).
	const resolvedTags = tag_ids.map((tag) => tags.find((t) => t.id === tag));

	return json(resolvedTags);
}
