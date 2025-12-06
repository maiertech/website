import { defineCollection } from '@content-collections/core';
import { tagMetaSchema } from '@maiertech/sveltekit-helpers';

export const collection = defineCollection({
	name: 'tags',
	directory: 'src/collections/tags', // Relative to `content-collections.ts`.
	include: '*.json',
	parser: 'json',
	schema: tagMetaSchema
});
