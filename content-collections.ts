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
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load post last modified metadata as fallback for environments without Git.
let postLastmodMetadata: Record<string, string> = {};
const metadataPath = resolve(__dirname, 'src/lib/server/data/posts/lastmod.json');

try {
	const raw = readFileSync(metadataPath, 'utf-8');
	postLastmodMetadata = JSON.parse(raw);
} catch {
	// Metadata file may not exist yet; that's okay.
}

// Function to persist updated metadata to file.
function updateMetadataFile(): void {
	try {
		writeFileSync(metadataPath, JSON.stringify(postLastmodMetadata, null, 2));
	} catch {
		// Silently fail if we can't write; metadata is still in memory.
	}
}

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

		// Resolve last modified date: try metadata file first, then Git, then current date.
		const lastmodDate = await cache(postMeta._meta.filePath, async (filePath) => {
			const fileKey = `src/routes/posts/${filePath}`;

			// Priority 1: Check metadata file.
			if (postLastmodMetadata[fileKey]) {
				// Try to update from Git while returning cached value.
				try {
					const { stdout } = await execAsync(`git log -1 --format=%ai -- "${fileKey}"`);
					if (stdout) {
						const gitDate = new Date(stdout.trim()).toISOString();
						// Update metadata file if Git date differs.
						if (postLastmodMetadata[fileKey] !== gitDate) {
							postLastmodMetadata[fileKey] = gitDate;
							updateMetadataFile();
						}
						return gitDate;
					}
				} catch {
					// Git failed; use cached value.
				}
				return postLastmodMetadata[fileKey];
			}

			// Priority 2: Try Git.
			try {
				const { stdout } = await execAsync(`git log -1 --format=%ai -- "${fileKey}"`);
				if (stdout) {
					const gitDate = new Date(stdout.trim()).toISOString();
					// Cache the value.
					postLastmodMetadata[fileKey] = gitDate;
					updateMetadataFile();
					return gitDate;
				}
			} catch {
				// Git command failed; proceed to fallback.
			}

			// Priority 3: Current date.
			const currentDate = new Date().toISOString();
			postLastmodMetadata[fileKey] = currentDate;
			updateMetadataFile();
			return currentDate;
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
