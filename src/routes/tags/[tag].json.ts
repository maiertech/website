import type { RequestHandler } from '@sveltejs/kit';
import tags from '$lib/tags';
import { getPosts } from '$lib/posts';

export const get: RequestHandler = async function ({ params }) {
  const { tag: key } = params;
  // tag is undefined when not found in tags.
  const tag = tags.find((t) => t.key === key);
  if (!tag) {
    const message = `Tag '${key}' is not a permitted tag.`;
    return {
      status: 404,
      body: { error: message },
    };
  }

  // Read tagged posts.
  const posts = await getPosts(key);

  return {
    status: 200,
    body: { tag, posts },
  };
};
