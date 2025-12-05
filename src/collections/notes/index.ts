import { defineCollection } from '@content-collections/core';
import type { VcImageMeta } from '@maiertech/sveltekit-helpers';
import { getOgImageUrl, noteMetaSchema } from '@maiertech/sveltekit-helpers';

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

	const ogImageMeta: VcImageMeta = {
		...OG_IMAGE_META,
		title
	} as unknown as VcImageMeta;

	return await getOgImageUrl({
		meta: ogImageMeta,
		apiKey: process.env.VIRALCARDS_API_KEY!
	});
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
			ogImageUrl
		};
	}
});
