import { createSrc, createSrcset } from '$lib/utils/imgix';

import type { RequestHandler } from './__types';
import type { Images } from '$models/content.model';

const imgArray = [
  {
    id: 'active-example-input-active',
    url: 'https://share.mailbox.org/ajax/share/00cd62140d160f4004ead7fd160f4c9eb3c53058f6677fed/1/8/MTY0/MTY0LzIwOA?dl=true',
  },
  {
    id: 'active-example-input-focus',
    url: 'https://share.mailbox.org/ajax/share/05f8277b08cd7a5457be8108cd7a4422967dcebdf488ac1c/1/8/MTY0/MTY0LzIxMQ?dl=true',
  },
  {
    id: 'active-example-button-active',
    url: 'https://share.mailbox.org/ajax/share/05b1f54408d5f2415323a2f8d5f24a60817dc583c7ec0046/1/8/MTY0/MTY0LzIwNA?dl=true',
  },
  {
    id: 'focus-example-input',
    url: 'https://share.mailbox.org/ajax/share/098e6d23049dc35090da24849dc3417cb566198865235aec/1/8/MTY0/MTY0LzIwNw?dl=true',
  },
  {
    id: 'focus-example-button',
    url: 'https://share.mailbox.org/ajax/share/02ad199b061f895a22ed6f061f894817addd29f0c00cec50/1/8/MTY0/MTY0LzIwNg?dl=true',
  },
  {
    id: 'focus-visible-example-input',
    url: 'https://share.mailbox.org/ajax/share/08b7f91602e50c53834367d2e50c40eaa887f5a3c23f9806/1/8/MTY0/MTY0LzIwOQ?dl=true',
  },
  {
    id: 'focus-visible-example-button-mouse',
    url: 'https://share.mailbox.org/ajax/share/0c7d36ea06ed6b50cfef9816ed6b44cca10627ea17b51666/1/8/MTY0/MTY0LzIxMA?dl=true',
  },
  {
    id: 'focus-visible-example-button-keyboard',
    url: 'https://share.mailbox.org/ajax/share/09dca60d03d4e05295f69663d4e047e69a99967b44c3510e/1/8/MTY0/MTY0LzIxMg?dl=true',
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
