import { createSrc, createSrcset } from '$lib/utils/imgix';

import type { RequestHandler } from './__types';
import type { Images } from '$models/content.model';

const imgArray = [
  {
    id: 'display-preferences-light',
    url: 'https://share.mailbox.org/ajax/share/013e5cae0fbeb5681bd93c5fbeb54c658aaba3c04325a784/1/8/MTcx/MTcxLzIzMw?dl=true',
  },
  {
    id: 'display-preferences-dark',
    url: 'https://share.mailbox.org/ajax/share/01588329089bdd6a1db4c4289bdd4fe7bba1157f753b0644/1/8/MTcx/MTcxLzIzMg?dl=true',
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
