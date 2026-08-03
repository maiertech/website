import { defineCollection } from '@content-collections/core';
import { noteMetaSchema } from '@maiertech/sveltekit-helpers';

async function createOgImageUrl({
	title,
	ogImageUrl
}: {
	title: string;
	ogImageUrl: string | undefined;
}): Promise<string | undefined> {
	// `ogImageUrl` from `noteMeta` takes precedence.
	if (ogImageUrl) {
		return ogImageUrl;
	}

	const config = {
		title,
		author: 'Thilo Maier',
		tag: 'Note',
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

export const collection = defineCollection({
	name: 'notes',
	directory: 'src/routes/notes',
	include: '**/*.md',
	parser: 'frontmatter-only',
	schema: noteMetaSchema,
	transform: async (noteMeta, { cache }) => {
		// Derive path from `_meta.directory`: (year)/slug-name → /notes/slug-name.
		const slug = noteMeta._meta.directory.split('/').pop();
		const path = `/notes/${slug}`;

		// Generate and cache OG image URL if API key is set.
		// API key is not set in CI to prevent API calls.
		const ogImageUrl = process.env.VIRALCARDS_API_KEY
			? await cache(noteMeta.title, () =>
					createOgImageUrl({
						title: noteMeta.title,
						ogImageUrl: noteMeta.ogImageUrl
					})
				)
			: noteMeta.ogImageUrl;

		return {
			...noteMeta,
			path,
			ogImageUrl: ogImageUrl || undefined // Convert '' to `undefined`.
		};
	}
});
