import { createSrc, createSrcset } from '$lib/utils/imgix';

import type { RequestHandler } from './__types';
import type { Images } from '$models/content.model';

const imgArray = [
  {
    id: 'active-example-input-active',
    url: 'https://share.mailbox.org/ajax/share/0c0c3a2d09fbff5fc8ff5469fbff43298d3e163524e7ac09/1/8/MTcw/MTcwLzIyNQ?dl=true',
  },
  {
    id: 'active-example-input-focus',
    url: 'https://share.mailbox.org/ajax/share/0404799f066f9755487b6f466f9748fe8653c98b5342ce52/1/8/MTcw/MTcwLzIyNg?dl=true',
  },
  {
    id: 'active-example-button-active',
    url: 'https://share.mailbox.org/ajax/share/07650c680eaf755d7e6c303eaf7543e9bbea856e03a8e088/1/8/MTcw/MTcwLzIyNA?dl=true',
  },
  {
    id: 'focus-example-input',
    url: 'https://share.mailbox.org/ajax/share/00a023bf0f47ac55023ecd4f47ac4abb868614088b2e12ff/1/8/MTcw/MTcwLzIyOA?dl=true',
  },
  {
    id: 'focus-example-button',
    url: 'https://share.mailbox.org/ajax/share/079bce1703219264718017c3219244d89f32016b60224376/1/8/MTcw/MTcwLzIyNw?dl=true',
  },
  {
    id: 'focus-visible-example-input',
    url: 'https://share.mailbox.org/ajax/share/0f6084be09803861fe34bd59803840e89fb9598f28a47ca4/1/8/MTcw/MTcwLzIzMQ?dl=true',
  },
  {
    id: 'focus-visible-example-button-mouse',
    url: 'https://share.mailbox.org/ajax/share/027182240c0477682f24d4fc04774ab08923dae53a6eca64/1/8/MTcw/MTcwLzIzMA?dl=true',
  },
  {
    id: 'focus-visible-example-button-keyboard',
    url: 'https://share.mailbox.org/ajax/share/08854d7d003835628068216038354109bfeac9fc96bfa88b/1/8/MTcw/MTcwLzIyOQ?dl=true',
  },
];

const imgObject: Images = {};

imgArray
  .map(({ id, url }) => ({
    id,
    src: createSrc(url),
    srcset: createSrcset(url),
  }))
  .forEach(({ id, src, srcset }) => {
    imgObject[id] = { src, srcset };
  });

export const get: RequestHandler = async function () {
  return {
    status: 200,
    body: { images: imgObject },
  };
};
