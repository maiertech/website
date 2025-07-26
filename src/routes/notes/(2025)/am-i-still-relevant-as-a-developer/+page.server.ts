import { VIRALCARDS_API_KEY } from '$env/static/private';
import { ogImageTemplate } from '$lib/templates';
import type { VcImageMeta } from '@maiertech/sveltekit-helpers';
import { getOgImageUrl } from '@maiertech/sveltekit-helpers';
import type { PageServerLoad } from './$types';
import meta from './meta';

export const load: PageServerLoad = async () => {
	const { title, description } = meta;
	const ogImageMeta = { ...ogImageTemplate, template: 'maiertechNote', title } as VcImageMeta;
	const ogImageUrl = await getOgImageUrl({ meta: ogImageMeta, apiKey: VIRALCARDS_API_KEY });
	return {
		note: meta,
		seo: { title, description, ogImageUrl }
	};
};
