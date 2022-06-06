import { getPosts } from '$lib/posts';

import type { RequestHandler } from './__types';
import tags from '$lib/data/tags';

export const get: RequestHandler = async function ({ params }) {
  const { tag: key } = params;
  // Tag is undefined when not found in tags.
  const tag = tags.find((t) => t.key === key);
  if (!tag) {
    return {
      status: 404,
      // This custom error message is currently ignored.
      // https://github.com/sveltejs/kit/issues/3715
      error: `Tag '${key}' is not a valid tag.`,
    };
  }

  // Read tagged posts (in any category that has not set `suppress` to true.
  const posts = await getPosts({ tag: key });

  return {
    status: 200,
    body: { tag, posts },
  };
};
