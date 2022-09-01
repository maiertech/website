import { json as json$1 } from '@sveltejs/kit';
import { createSrc, createSrcset } from '$lib/utils/imgix';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async function ({ request }) {
  const { path } = (await request.json()) as { path: string };

  const src = createSrc(path);
  const srcset = createSrcset(path);

  return json$1({ sources: { src, srcset } });
};
