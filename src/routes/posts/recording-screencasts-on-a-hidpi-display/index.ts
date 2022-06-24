import { createSrc, createSrcset } from '$lib/utils/imgix';

import type { RequestHandler } from './__types';
import type { Images } from '$models/content.model';

const imgArray = [
  {
    id: 'display-preferences-light',
    url: 'https://share.mailbox.org/ajax/share/03ff1a5f08a2b74f37cd5348a2b742568a6f523945ee8091/1/8/MTY1/MTY1LzIxNA?dl=true',
  },
  {
    id: 'display-preferences-dark',
    url: 'https://share.mailbox.org/ajax/share/06fbc98e05155f4c67806e55155f42568c2d334e30d8248b/1/8/MTY1/MTY1LzIxMw?dl=true',
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
