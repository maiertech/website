import type { RequestHandler } from '@sveltejs/kit';
import categories from '$lib/data/categories';

export const get: RequestHandler = function () {
  return {
    status: 200,
    body: { categories },
  };
};
