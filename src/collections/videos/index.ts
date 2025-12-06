import { defineCollection } from '@content-collections/core';
import { videoMetaSchema } from '@maiertech/sveltekit-helpers';

export const collection = defineCollection({
	name: 'videos',
	directory: 'src/routes/videos',
	include: '**/*.md',
	parser: 'frontmatter-only',
	schema: videoMetaSchema,
	transform: async (videoMeta) => {
		// Derive path from `_meta.directory`: (year)/slug-name → /videos/slug-name.
		const slug = videoMeta._meta.directory.split('/').pop();
		const path = `/videos/${slug}`;
		const ogImageUrl =
			videoMeta.ogImageUrl ?? `https://i.ytimg.com/vi/${videoMeta.id}/maxresdefault.jpg`;

		return {
			...videoMeta,
			path,
			ogImageUrl
		};
	}
});
