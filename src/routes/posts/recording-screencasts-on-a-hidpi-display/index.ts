import { createSrc, createSrcset } from '$lib/utils/imgix';

import type { RequestHandler } from './__types';
import type { Images } from '$models/content.model';

const assets = [
  {
    id: 'display-preferences-light',
    path: '/screencast-series/display-preferences-light.d289926a40.png',
  },
  {
    id: 'display-preferences-dark',
    path: '/screencast-series/display-preferences-dark.84192cbe6c.png',
  },
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
