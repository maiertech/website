import { defineCollection } from '@content-collections/core';
import { avatarMetaSchema } from '@maiertech/sveltekit-helpers';

export const collection = defineCollection({
	name: 'authors',
	directory: 'src/collections/authors', // Relative to `content-collections.ts`.
	include: '*.json',
	parser: 'json',
	schema: avatarMetaSchema
});
