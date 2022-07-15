import { createSrc, createSrcset } from '$lib/utils/imgix';

import type { RequestHandler } from './__types';
import type { Images } from '$models/content.model';

const imgArray = [
  {
    id: 'svelte-repl',
    url: 'https://share.mailbox.org/ajax/share/0757839a07c3e1507d44cf17c3e149d797dd1e459518c7d8/1/8/MTY3/MTY3LzIxOA?dl=true',
  },
  {
    id: 'svelte-template',
    url: 'https://share.mailbox.org/ajax/share/0fc0d8a202525259f4317c92525243fd8b483eb3a552db13/1/8/MTY3/MTY3LzIxOQ?dl=true',
  },
  {
    id: 'csb-new-sandbox-dialog',
    url: 'https://share.mailbox.org/ajax/share/01658b76022430561e6441d224304d3aa354fbca9bde10b3/1/8/MTY3/MTY3LzIyMA?dl=true',
  },
  {
    id: 'csb-svelte-template',
    url: 'https://share.mailbox.org/ajax/share/05c0b7bb0495126e54378d04951248f3a59a56f49cd81231/1/8/MTY3/MTY3LzIzNA?dl=true',
  },
  {
    id: 'stackblitz-dashboard',
    url: 'https://share.mailbox.org/ajax/share/02568d4905fc596d2d542225fc594a3584b0b295e7076fb5/1/8/MTY3/MTY3LzIzNQ?dl=true',
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

export const GET: RequestHandler = async function () {
  return {
    status: 200,
    body: { images: imgObject },
  };
};
