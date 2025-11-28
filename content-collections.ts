import { defineCollection, defineConfig } from '@content-collections/core';
import type { VcImageMeta } from '@maiertech/sveltekit-helpers';
import {
	avatarMetaSchema,
	getOgImageUrl,
	noteMetaSchema,
	postMetaSchema,
	tagMetaSchema
} from '@maiertech/sveltekit-helpers';
import { exec } from 'child_process';
import { config } from 'dotenv';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Load last modified dates for posts.
let lastmodDates: Record<string, string> = {};
const filepath = resolve(process.cwd(), 'src/lib/server/collections/posts/lastmod.json');

try {
	const raw = readFileSync(filepath, 'utf-8');
	lastmodDates = JSON.parse(raw);
} catch {
	// If file doesn't exist, it will be written later.
}

function writeLastmodDates(): void {
	try {
		// Sort keys before writing. Use tabs and finish with an empty line to make linter happy.
		writeFileSync(
			filepath,
			JSON.stringify(lastmodDates, Object.keys(lastmodDates).sort(), '\t') + '\n'
		);
	} catch {
		// Writing `lastmodDates` can fail silently.
	}
}

// This file runs outside Vite. Therefore, `.env` is not automatically available in this file.
config();

const authors = defineCollection({
	name: 'authors',
	directory: 'src/lib/server/collections/authors',
	include: '*.json',
	parser: 'json',
	schema: avatarMetaSchema
});

const tags = defineCollection({
	name: 'tags',
	directory: 'src/lib/server/collections/tags',
	include: '*.json',
	parser: 'json',
	schema: tagMetaSchema
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

		// Resolve last modified date.
		const filePath = `src/routes/posts/${postMeta._meta.filePath}`;

		// Step 1: try to read lastmod date from `lastmod.json`. This may be outdated.
		let lastmodDate: string | undefined = lastmodDates[filePath];
		if (!lastmodDate) {
			lastmodDate = new Date().toISOString(); // Current date as fallback.
		}

		// Step 2: Try to obtain the precise lastmod date from the Git history of the current branch.
		try {
			const { stdout } = await execAsync(`git log -1 --format=%ai -- "${filePath}"`);
			if (stdout) {
				lastmodDate = new Date(stdout.trim()).toISOString();
				lastmodDates[filePath] = lastmodDate;
				writeLastmodDates();
			}
		} catch {
			// Silently fail when there is no Git history, e.g. on Railway.
			// In this case, the date from `lastmod.json` or the current date will be used.
		}

		// Generate and cache OG image URL.
		const ogImageUrl: string = await cache(postMeta.title, async () => {
			// `ogImageUrl` from `postMeta` takes precedence.
			let ogImageUrl: string | undefined = postMeta.ogImageUrl;

			if (!postMeta.ogImageUrl) {
				const ogImageMeta = {
					template: 'maiertechPost',
					title: postMeta.title,
					avatarName: 'Thilo Maier',
					avatarImageUrl: 'https://maier.tech/assets/portrait-thilo-maier.jpg',
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
					avatarImageUrl: 'https://maier.tech/assets/portrait-thilo-maier.jpg',
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
