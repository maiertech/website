import categories from '$lib/data/categories';
import { getPosts } from '$lib/posts';

import type { RequestHandler } from './__types';

export const get: RequestHandler = async function ({ params }) {
  const { category: key } = params;
  // Category is undefined when not found in categories.
  const category = categories.find((c) => c.key === key);
  // Category is invalid if not found or if found and it has no path.
  if (!category || !category.path) {
    return {
      status: 404,
      // This custom error message is currently ignored.
      // https://github.com/sveltejs/kit/issues/3715
      error: `Category '${key}' is not a valid category.`,
    };
  }

  // Read posts for category.
  const posts = await getPosts({ category: key });

  return {
    status: 200,
    body: { category, posts },
  };
};
