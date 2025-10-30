import { defineCollection, defineConfig } from '@content-collections/core';
import type { VcImageMeta } from '@maiertech/sveltekit-helpers';
import { getOgImageUrl, noteMetaSchema, tagSchema } from '@maiertech/sveltekit-helpers';
import { config } from 'dotenv';

// This runs outside Vite. Therefore, `.env` is not automatically loaded during development.
config();

const tags = defineCollection({
	name: 'tags',
	directory: 'src/lib/server/data/tags',
	include: '*.json',
	parser: 'json',
	schema: tagSchema
});

const notes = defineCollection({
	name: 'notes',
	directory: 'src/routes/notes',
	include: '**/*.md',
	parser: 'frontmatter-only',
	schema: noteMetaSchema,
	transform: async (noteMeta, { cache }) => {
		// Derive path from `_meta.directory`: (year)/slug-name → /notes/slug-name.
		const slug = noteMeta._meta.directory.split('/').pop();
		const path = `/notes/${slug}`;

		const ogImageUrl: string = await cache(noteMeta.id, async () => {
			// `ogImageUrl` from `postMeta` takes precedence.
			let ogImageUrl: string | undefined = noteMeta.ogImageUrl;

			if (!noteMeta.ogImageUrl) {
				const ogImageMeta = {
					template: 'maiertechNote',
					title: noteMeta.title,
					avatarName: 'Thilo Maier',
					avatarImageUrl: 'https://www.maier.tech/assets/portrait-thilo-maier.jpg',
					height: 630,
					width: 1200,
					colors: {
						ink: '#020618',
						surface: '#f1f5f9',
						primary: '#193cb8',
						accent: '#1e2939'
					},
					fonts: [
						{
							name: 'Roboto',
							style: 'normal',
							weight: 400
						},
						{
							name: 'Roboto',
							style: 'normal',
							weight: 700
						}
					]
				} as VcImageMeta;

				ogImageUrl = await getOgImageUrl({
					meta: ogImageMeta,
					apiKey: process.env.VIRALCARDS_API_KEY!
				});
			}

			return ogImageUrl!;
		});

		return {
			...noteMeta,
			path,
			ogImageUrl
		};
	}
});

export default defineConfig({
	collections: [tags, notes]
});
