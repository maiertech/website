import { createSrc, createSrcset } from '$lib/utils/imgix';

import type { RequestHandler } from './__types';
import type { Images } from '$lib/types/images.type';

const assets = [
  { id: 'brooklyn-bridge', path: '/brooklyn-bridge.cf71a0a1f5.jpg' },
];

const images: Images = {};

assets
  .map(({ id, path }) => ({
    id,
    src: createSrc(path),
    srcset: createSrcset(path),
  }))
  .forEach(({ id, src, srcset }) => {
    images[id] = { src, srcset };
  });

export const get: RequestHandler = async function () {
  return {
    status: 200,
    body: { images },
  };
};
