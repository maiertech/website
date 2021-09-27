import type { RequestHandler } from '@sveltejs/kit';
import { getPosts } from '$lib/posts';

export const get: RequestHandler = async function () {
  // Caching files to avoid reading the same files several times from the file system would break local dev.
  const posts = await getPosts();

  return {
    status: 200,
    body: { posts },
  };
};
