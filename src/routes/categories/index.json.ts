import categories from '$data/categories';

import type { RequestHandler } from './__types/index.json';

export const get: RequestHandler = function () {
  return {
    status: 200,
    body: { categories },
  };
};
