import { defineCollection } from '@content-collections/core';
import { noteMetaSchema } from '@maiertech/sveltekit-helpers';

/**
 * OG image link generation.
 */

const OG_IMAGE_META = {
	template: 'maiertechNote' as const,
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
	// `ogImageUrl` from `noteMeta` takes precedence.
	if (ogImageUrl) {
		return ogImageUrl;
	}

	const imageMeta = {
		...OG_IMAGE_META,
		title
	};

	const response = await fetch('https://create.viral.cards/api/v1/satori', {
		method: 'POST',
		headers: {
			'X-API-Key': process.env.VIRALCARDS_API_KEY!,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(imageMeta)
	});

	if (!response.ok) {
		// 1 attempt to generate an OG image link. If it fails, no retry.
		// Return '' instead of `undefined` to not break serialization when result is cached.
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

		// Generate and cache OG image URL.
		const ogImageUrl = await cache(noteMeta.title, () =>
			createOgImageUrl(noteMeta.title, noteMeta.ogImageUrl)
		);

		return {
			...noteMeta,
			path,
			ogImageUrl: ogImageUrl || undefined // Convert '' to `undefined`.
		};
	}
});
