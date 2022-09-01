import { createImgMap } from '$lib/utils/img';
import type { PageServerLoad } from './$types';
import { metadata } from './+page.svx';

const images = createImgMap(metadata.images);

export const load: PageServerLoad = async function () {
  return { images };
};
