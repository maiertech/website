import type { RequestHandler } from '@sveltejs/kit';
import categories from '$lib/data/categories';
import { getPosts } from '$lib/posts';

export const get: RequestHandler = async function ({ params }) {
  const { category: key } = params;
  // category is undefined when not found in categories.
  const category = categories.find((c) => c.key === key);
  if (!category) {
    const message = `Category '${key}' is not a permitted category.`;
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
