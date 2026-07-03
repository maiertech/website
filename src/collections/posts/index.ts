import { defineCollection } from '@content-collections/core';
import { postMetaSchema } from '@maiertech/sveltekit-helpers';
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { collection as authors } from '../authors/index.js';
import { collection as tags } from '../tags/index.js';

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

async function createOgImageUrl({
	title,
	author,
	ogImageUrl
}: {
	title: string;
	author: string | undefined;
	ogImageUrl: string | undefined;
}): Promise<string | undefined> {
	// `ogImageUrl` from `postMeta` takes precedence.
	if (ogImageUrl) {
		return ogImageUrl;
	}

	const config = {
		title,
		author,
		tag: 'Post',
		colors: {
			ink: '#020618',
			surface: '#f1f5f9',
			primary: '#193cb8',
			accent: '#1e2939'
		},
		fontName: 'Roboto'
	};

	const response = await fetch('https://create.viral.cards/api/v1/create-link', {
		method: 'POST',
		headers: {
			'X-API-Key': process.env.VIRALCARDS_API_KEY!,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username: 'maiertech', template: 'og-article', config })
	});

	if (!response.ok) {
		// 1 attempt to generate an OG image link. If it fails, no retry.
		// Return '' instead of `undefined` to not break serialization when result is cached.
		// TODO: Log or throw the error somehow.
		return '';
	}

	const url = await response.text();
	return url;
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
		const author = documents(authors).find((a) => a.id === postMeta.author);

		// Resolve tags. Filter tags that cannot be resolved.
		const resolvedTags = postMeta.tags
			? postMeta.tags
					.map((tagId) => documents(tags).find((t) => t.id === tagId))
					.filter((tag) => tag !== undefined)
			: undefined;

		// Resolve last modified date.
		const filepath = `src/routes/posts/${postMeta._meta.filePath}`;
		const lastmodDate = resolveLastmodDate(filepath);

		// Generate and cache OG image URL.
		const ogImageUrl = await cache(postMeta.title, () =>
			createOgImageUrl({
				title: postMeta.title,
				author: author?.name,
				ogImageUrl: postMeta.ogImageUrl
			})
		);

		return {
			...postMeta,
			path,
			author,
			tags: resolvedTags,
			lastmodDate,
			ogImageUrl: ogImageUrl || undefined // Convert '' to `undefined`.
		};
	}
});
