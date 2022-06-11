import categories from '$data/categories';
import { getPosts } from '$lib/posts';

import type { RequestHandler } from './__types';

export const get: RequestHandler = async function ({ params }) {
  const { category: id } = params;
  // Category is undefined when not found in categories.
  const category = categories.find((c) => c.id === id);
  // Category is invalid if not found or if found and it has no path.
  if (!category || !category.path) {
    return {
      status: 404,
      // This custom error message is currently ignored.
      // https://github.com/sveltejs/kit/issues/3715
      error: `Category '${id}' is not a valid category.`,
    };
  }

  // Read posts for category.
  const posts = await getPosts({ category: id });

  return {
    status: 200,
    body: { category, posts },
  };
};
