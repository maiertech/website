import { createSrc, createSrcset } from '$lib/utils/imgix';
import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async function ({ request }) {
	const { path } = (await request.json()) as { path: string };

	const src = createSrc(path);
	const srcset = createSrcset(path);

	return json({ sources: { src, srcset } });
};
