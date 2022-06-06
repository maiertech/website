import { createSrc, createSrcset } from '$lib/utils/imgix';

import type { RequestHandler } from './__types';

export const post: RequestHandler = async function ({ request }) {
  const { path } = (await request.json()) as { path: string };

  const src = createSrc(path);
  const srcset = createSrcset(path);

  return {
    body: { sources: { src, srcset } },
  };
};
