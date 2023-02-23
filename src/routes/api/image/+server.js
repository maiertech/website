import { z } from 'zod';
import { error, json } from '@sveltejs/kit';
import { createSrc, createSrcset } from '$lib/utils/imgix';

export const prerender = false;

const PayloadSchema = z.object({
	url: z.string().url()
});

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const result = PayloadSchema.safeParse(await request.json());

	if (!result.success) {
		throw error(400, 'Payload validation failed.');
	}

	const { url } = result.data;

	return json({ src: createSrc(url), srcset: createSrcset(url) });
}
