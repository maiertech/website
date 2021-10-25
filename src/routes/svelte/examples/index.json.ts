import type { RequestHandler } from '@sveltejs/kit';
import examples from '$lib/data/examples';

export const get: RequestHandler = async function () {
  return {
    status: 200,
    body: { examples },
  };
};
