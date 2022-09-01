import { createSrc, createSrcset } from '$lib/utils/imgix';
import type { Images, OriginImage } from '$models/content.model';

export function createImgMap(originImages: OriginImage[]): Images {
	const images = {};

	originImages
		.map(({ id, url }) => ({
			id,
			src: createSrc(url),
			srcset: createSrcset(url)
		}))
		.forEach(({ id, src, srcset }) => {
			images[id] = { src, srcset };
		});
	return images;
}
