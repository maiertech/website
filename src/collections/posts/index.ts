import { defineCollection } from '@content-collections/core';
import type { VcImageMeta } from '@maiertech/sveltekit-helpers';
import { getOgImageUrl, postMetaSchema } from '@maiertech/sveltekit-helpers';
import { execSync } from 'child_process';
import { config } from 'dotenv';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { collection as authors } from '../authors/index.js';
import { collection as tags } from '../tags/index.js';

// Load `.env` since this file runs outside Vite.
config();

/**
 * Lastmod date management.
 */

let lastmodDates: Record<string, string> = {};
const lastmodFile = resolve(process.cwd(), 'src/collections/posts/lastmod.json');

function readLastmodDates(): void {
	try {
		const raw = readFileSync(lastmodFile, 'utf-8');
		lastmodDates = JSON.parse(raw);
	} catch {
		// If file doesn't exist, it will be written later.
	}
}

function writeLastmodDates(): void {
	try {
		// Sort keys before writing. Use tabs and finish with an empty line to make linter happy.
		writeFileSync(
			lastmodFile,
			JSON.stringify(lastmodDates, Object.keys(lastmodDates).sort(), '\t') + '\n'
		);
	} catch {
		// Writing `lastmodDates` can fail silently.
	}
}

readLastmodDates();

/**
 * OG image link generation.
 */

const OG_IMAGE_META = {
	template: 'maiertechPost' as const,
	avatarName: 'Thilo Maier' as const,
	avatarImageUrl: 'https://maier.tech/assets/portrait-thilo-maier.jpg' as const,
	height: 630 as const,
	width: 1200 as const,
	colors: {
		ink: '#020618',
		surface: '#f1f5f9',
		primary: '#193cb8',
		accent: '#1e2939'
	},
	fonts: [
		{ name: 'Roboto' as const, style: 'normal' as const, weight: 400 as const },
		{ name: 'Roboto' as const, style: 'normal' as const, weight: 700 as const }
	]
};

async function createOgImageUrl(
	title: string,
	ogImageUrl: string | undefined
): Promise<string | undefined> {
	// `ogImageUrl` from `postMeta` takes precedence.
	if (ogImageUrl) {
		return ogImageUrl;
	}

	const ogImageMeta: VcImageMeta = {
		...OG_IMAGE_META,
		title
	} as unknown as VcImageMeta;

	return await getOgImageUrl({
		meta: ogImageMeta,
		apiKey: process.env.VIRALCARDS_API_KEY!
	});
}

/**
 * Resolve lastmod date.
 */

function resolveLastmodDate(filepath: string): string {
	// Step 1: Try to read lastmod date from `lastmod.json`. This may be outdated.
	let lastmodDate: string | undefined = lastmodDates[filepath];
	if (lastmodDate) {
		return lastmodDate;
	}

	// Step 2: Try to obtain the precise lastmod date from the Git history of the current branch.
	try {
		const stdout = execSync(`git log -1 --format=%ai -- "${filepath}"`, {
			encoding: 'utf-8'
		});
		if (stdout.trim()) {
			lastmodDate = new Date(stdout.trim()).toISOString();
			lastmodDates[filepath] = lastmodDate;
			writeLastmodDates();
			return lastmodDate;
		}
	} catch {
		// Silently fail when there is no Git history, e.g. on Railway.
	}

	// Fallback: current date.
	return new Date().toISOString();
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
		const lastmodDate = resolveLastmodDate(filepath);

		// Generate and cache OG image URL.
		const ogImageUrl = await cache(postMeta.title, () =>
			createOgImageUrl(postMeta.title, postMeta.ogImageUrl)
		);

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
