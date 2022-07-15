import type { RequestHandler } from '@sveltejs/kit';
import { getPosts } from '$lib/posts';

export const GET: RequestHandler = async function () {
  // Don't cache files. This would break local dev.
  const posts = await getPosts({ compare: 'modified' });

  return {
    status: 200,
    body: { posts },
  };
};
