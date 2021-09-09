import type { RequestHandler } from '@sveltejs/kit';
import categories from '$lib/categories';

export const get: RequestHandler = function () {
  return {
    status: 200,
    body: { categories },
  };
};
