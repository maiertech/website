import type { RequestHandler } from '@sveltejs/kit';
import tags from '$lib/tags';

export const get: RequestHandler = async function ({ params }) {
  const { tag: key } = params;
  // tag is undefined when not found in tags.
  const tag = tags.find((t) => t.key === key);
  return {
    status: 200,
    body: { tag },
  };
};
