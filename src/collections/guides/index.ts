import { defineCollection } from '@content-collections/core';
import { docMetaSchema } from '@maiertech/sveltekit-helpers';

export const collection = defineCollection({
	name: 'guides',
	directory: 'src/routes/guides',
	include: '**/*.md',
	parser: 'frontmatter-only',
	schema: docMetaSchema,
	transform: async (guideMeta) => {
		// Derive path from `_meta.directory`: slug-name → /guides/slug-name.
		const slug = guideMeta._meta.directory.split('/').pop();
		const path = `/guides/${slug}`;

		return {
			...guideMeta,
			path
		};
	}
});
