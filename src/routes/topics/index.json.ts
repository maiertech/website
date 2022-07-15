import topics from '$data/topics';

import type { RequestHandler } from './__types/index.json';

export const GET: RequestHandler = function () {
  return {
    status: 200,
    body: { topics },
  };
};
