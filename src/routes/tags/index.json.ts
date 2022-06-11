import tags from '$data/tags';

import type { RequestHandler } from './__types/index.json';

// How to use function types:
// https://2ality.com/2020/04/typing-functions-typescript.html#checking-if-a-value-matches-a-type
export const get: RequestHandler = function () {
  return {
    status: 200,
    body: { tags },
  };
};
