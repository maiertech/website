import type { RequestHandler } from '@sveltejs/kit';
import { getPosts } from '$lib/posts';

export const get: RequestHandler = async function () {
  // Don't cache files. This would break local dev.
  const posts = await getPosts();

  return {
    status: 200,
    body: { posts },
  };
};
