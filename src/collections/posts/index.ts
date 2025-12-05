import { defineCollection } from '@content-collections/core';
import type { VcImageMeta } from '@maiertech/sveltekit-helpers';
import { getOgImageUrl, postMetaSchema } from '@maiertech/sveltekit-helpers';
import { exec } from 'child_process';
import { config } from 'dotenv';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import { collection as authors } from '../authors/index.js';
import { collection as tags } from '../tags/index.js';

// Since this file runs outside Vite, `.env` is not automatically available in this file.
config();

const execAsync = promisify(exec);

// Load last modified dates for posts.
let lastmodDates: Record<string, string> = {};
const filepath = resolve(process.cwd(), 'src/collections/posts/lastmod.json');

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

export const collection = defineCollection({
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
		const filepath = `src/routes/posts/${postMeta._meta.filePath}`;

		// Step 1: try to read lastmod date from `lastmod.json`. This may be outdated.
		let lastmodDate: string | undefined = lastmodDates[filepath];
		if (!lastmodDate) {
			lastmodDate = new Date().toISOString(); // Current date as fallback.
		}

		// Step 2: Try to obtain the precise lastmod date from the Git history of the current branch.
		try {
			const { stdout } = await execAsync(`git log -1 --format=%ai -- "${filepath}"`);
			if (stdout) {
				lastmodDate = new Date(stdout.trim()).toISOString();
				lastmodDates[filepath] = lastmodDate;
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
