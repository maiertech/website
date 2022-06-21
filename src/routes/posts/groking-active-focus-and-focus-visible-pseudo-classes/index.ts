import { createSrc, createSrcset } from '$lib/utils/imgix';

import type { RequestHandler } from './__types';
import type { Images } from '$models/content.model';

const assets = [
  {
    id: 'active-example-input-active',
    path: '/posts/groking-active-focus-and-focus-visible/active-example-input-active.5fcb5bbbdc.png',
  },
  {
    id: 'active-example-input-focus',
    path: '/posts/groking-active-focus-and-focus-visible/active-example-input-focus.4043eb59a6.png',
  },
  {
    id: 'active-example-button-active',
    path: '/posts/groking-active-focus-and-focus-visible/active-example-button-active.f80fe27eda.png',
  },
  {
    id: 'focus-example-input',
    path: '/posts/groking-active-focus-and-focus-visible/focus-example-input.c80290150b.png',
  },
  {
    id: 'focus-example-button',
    path: '/posts/groking-active-focus-and-focus-visible/focus-example-button.0db28ad65c.png',
  },
  {
    id: 'focus-visible-example-input',
    path: '/posts/groking-active-focus-and-focus-visible/focus-visible-example-input.78c222b706.png',
  },
  {
    id: 'focus-visible-example-button-mouse',
    path: '/posts/groking-active-focus-and-focus-visible/focus-visible-example-button-mouse.cb762b9ac1.png',
  },
  {
    id: 'focus-visible-example-button-keyboard',
    path: '/posts/groking-active-focus-and-focus-visible/focus-visible-example-button-keyboard.7d1fff5283.png',
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
