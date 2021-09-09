import type { RequestHandler } from '@sveltejs/kit';
import tags from '$lib/tags';

// How to use function types:
// https://2ality.com/2020/04/typing-functions-typescript.html#checking-if-a-value-matches-a-type
export const get: RequestHandler = function () {
  return {
    status: 200,
    body: { tags },
  };
};
