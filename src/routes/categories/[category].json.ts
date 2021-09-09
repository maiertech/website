import type { RequestHandler } from '@sveltejs/kit';
import categories from '$lib/categories';

export const get: RequestHandler = async function ({ params }) {
  const { category: key } = params;
  // category is undefined when not found in categories.
  const category = categories.find((c) => c.key === key);
  return {
    status: 200,
    body: { category },
  };
};
