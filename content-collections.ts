import { defineCollection, defineConfig } from '@content-collections/core';
import type { VcImageMeta } from '@maiertech/sveltekit-helpers';
import {
	avatarMetaSchema,
	getOgImageUrl,
	noteMetaSchema,
	tagSchema,
	postMetaSchema
} from '@maiertech/sveltekit-helpers';
import { config } from 'dotenv';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// This file runs outside Vite. Therefore, `.env` is not automatically available in this file.
config();

const authors = defineCollection({
	name: 'authors',
	directory: 'src/lib/server/data/authors',
	include: '*.json',
	parser: 'json',
	schema: avatarMetaSchema
});

const tags = defineCollection({
	name: 'tags',
	directory: 'src/lib/server/data/tags',
	include: '*.json',
	parser: 'json',
	schema: tagSchema
});

const posts = defineCollection({
	name: 'posts',
	directory: 'src/routes/posts',
	include: '**/*.md',
	parser: 'frontmatter-only',
	schema: postMetaSchema,
	transform: async (postMeta, { cache, documents }) => {
		// Derive path from `_meta.directory`: (year)/slug-name → /posts/slug-name.
		const slug = postMeta._meta.directory.split('/').pop();
		const path = `/posts/${slug}`;

		// Resolve author.
		const author = await documents(authors).find((a) => a.id === postMeta.author);

		// Resolve tags. Filter tags that cannot be resolved.
		const resolvedTags = postMeta.tags
			? (
					await Promise.all(
						postMeta.tags.map((tagId) => documents(tags).find((t) => t.id === tagId))
					)
				).filter((tag) => tag !== undefined)
			: undefined;

		// Resolve last modified date from Git repo.
		const lastmodDate = await cache(postMeta._meta.filePath, async (filePath) => {
			const { stdout } = await execAsync(`git log -1 --format=%ai -- "${filePath}"`);
			if (stdout) {
				return new Date(stdout.trim()).toISOString();
			}
			return new Date().toISOString();
		});

		// Generate and cache OG image URL.
		const ogImageUrl: string = await cache(postMeta.title, async () => {
			// `ogImageUrl` from `postMeta` takes precedence.
			let ogImageUrl: string | undefined = postMeta.ogImageUrl;

			if (!postMeta.ogImageUrl) {
				const ogImageMeta = {
					template: 'maiertechPost',
					title: postMeta.title,
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
			...postMeta,
			path,
			author,
			tags: resolvedTags,
			lastmodDate,
			ogImageUrl
		};
	}
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

		// Generate and cache OG image URL.
		const ogImageUrl: string = await cache(noteMeta.title, async () => {
			// `ogImageUrl` from `noteMeta` takes precedence.
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
	collections: [authors, tags, posts, notes]
});
