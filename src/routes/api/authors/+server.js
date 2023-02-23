import authors from '$lib/data/authors';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

export const prerender = false;

const PayloadSchema = z.array(z.string());

/**
 * Get all authors.
 * @type {import('./$types').RequestHandler}
 */
export function GET() {
	return json(authors);
}

/**
 * Resolve an array of author IDs.
 * @type {import('./$types').RequestHandler}
 */
export async function POST({ request }) {
	// Validate payload.
	const result = PayloadSchema.safeParse(await request.json());

	if (!result.success) {
		throw error(400, 'Payload validation failed.');
	}

	const author_ids = result.data;

	// Resolve author IDs (preserve order).
	const resolvedAuthors = author_ids.map((author) => authors.find((a) => a.id === author));

	return json(resolvedAuthors);
}
