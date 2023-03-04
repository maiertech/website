import { z } from 'zod';
import { error, json } from '@sveltejs/kit';
import { createSrc, createSrcset } from '$lib/utils/imgix';

const Schema = z.string().url();

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const result = Schema.safeParse(url.searchParams.get('url'));

	if (!result.success) {
		throw error(400, 'Invalid URL.');
	}

	const img_url = result.data;

	return json({ src: createSrc(img_url), srcset: createSrcset(img_url) });
}
