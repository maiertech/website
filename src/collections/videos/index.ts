import { defineCollection } from '@content-collections/core';
import { videoMetaSchema } from '@maiertech/sveltekit-helpers';
import { collection as tags } from '../tags/index.js';

export const collection = defineCollection({
	name: 'videos',
	directory: 'src/routes/videos',
	include: '**/*.md',
	parser: 'frontmatter-only',
	schema: videoMetaSchema,
	transform: async (videoMeta, { documents }) => {
		// Derive path from `_meta.directory`: (year)/slug-name → /videos/slug-name.
		const slug = videoMeta._meta.directory.split('/').pop();
		const path = `/videos/${slug}`;

		// Resolve tags. Filter tags that cannot be resolved.
		const resolvedTags = videoMeta.tags
			? (
					await Promise.all(
						videoMeta.tags.map((tagId) => documents(tags).find((t) => t.id === tagId))
					)
				).filter((tag) => tag !== undefined)
			: undefined;

		// Thumbnail URL has usually aspect ratio 16:9.
		const thumbnailUrl =
			videoMeta.thumbnailUrl ?? `https://i.ytimg.com/vi/${videoMeta.id}/maxresdefault.jpg`;

		// Open Graph image has standardized resolution of 1200x630 pixels.
		const ogImageUrl =
			videoMeta.ogImageUrl ?? `https://i.ytimg.com/vi/${videoMeta.id}/maxresdefault.jpg`;

		return {
			...videoMeta,
			path,
			tags: resolvedTags,
			thumbnailUrl,
			ogImageUrl
		};
	}
});
