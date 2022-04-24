import type { RequestHandler } from '@sveltejs/kit';
import tags from '$lib/data/tags';
import { getPosts } from '$lib/posts';

export const get: RequestHandler = async function ({ params }) {
  const { tag: key } = params;
  // tag is undefined when not found in tags.
  const tag = tags.find((t) => t.key === key);
  if (!tag) {
    const message = `Tag '${key}' is not a valid tag.`;
    return {
      status: 404,
      body: { error: message },
    };
  }

  // Read tagged posts (in any category that has not set `suppress` to false.
  const posts = await getPosts(undefined, key);

  return {
    status: 200,
    body: { tag, posts },
  };
};
