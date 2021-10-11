import type { RequestHandler } from '@sveltejs/kit';
import categories from '$lib/data/categories';
import { getPosts } from '$lib/posts';

export const get: RequestHandler = async function ({ params }) {
  const { category: key } = params;
  const category = categories.find((c) => c.key === key);
  // Category is invalid if not found or if found and it has no path.
  if (!category || !category.path) {
    const message = `Category '${key}' is not a valid category.`;
    return {
      status: 404,
      body: { error: message },
    };
  }

  // Read posts for category.
  const posts = await getPosts(key);

  return {
    status: 200,
    body: { category, posts },
  };
};
