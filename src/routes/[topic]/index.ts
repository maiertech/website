import topics from '$data/topics';
import { getPosts } from '$lib/posts';

import type { RequestHandler } from './__types';

export const get: RequestHandler = async function ({ params }) {
  const { topic: id } = params;
  // Topic is undefined when not found in topics.
  const topic = topics.find((t) => t.id === id);

  if (!topic) throw `Topic '${id}' is not a valid topic.`;

  // Read posts for topic.
  const posts = await getPosts({ topic: id });

  return {
    status: 200,
    body: { topic, posts },
  };
};
