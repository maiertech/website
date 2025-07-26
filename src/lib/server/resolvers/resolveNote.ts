import { VIRALCARDS_API_KEY } from '$env/static/private'; // Needs to support prerendering.
import { ogImageTemplate } from '$lib/templates';
import type { NoteMeta, VcImageMeta } from '@maiertech/sveltekit-helpers';
import { getOgImageUrl } from '@maiertech/sveltekit-helpers';

export default async function (noteMeta: NoteMeta) {
	// Resolve ogImageUrl.
	// `ogImageUrl` from `postMeta` takes precedence.
	let ogImageUrl: string | undefined = noteMeta.ogImageUrl;

	if (!ogImageUrl) {
		const ogImageMeta = {
			...ogImageTemplate,
			template: 'maiertechNote',
			title: noteMeta.title
		} as VcImageMeta;
		ogImageUrl = await getOgImageUrl({ meta: ogImageMeta, apiKey: VIRALCARDS_API_KEY });
	}

	const resolvedNote: NoteMeta = {
		...noteMeta,
		ogImageUrl
	};

	return resolvedNote;
}
