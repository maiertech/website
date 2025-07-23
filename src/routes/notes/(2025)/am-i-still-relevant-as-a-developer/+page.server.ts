import type { PageServerLoad } from './$types';
import meta from './meta';
import { getOgImageUrl } from '@maiertech/sveltekit-helpers';
import { ogImageTemplate } from '$lib/templates';
import type { VcImageMeta } from '@maiertech/sveltekit-helpers';
import { VIRALCARDS_API_KEY } from '$env/static/private';

export const load: PageServerLoad = async () => {
	const { title, description } = meta;
	const ogImageMeta = { ...ogImageTemplate, template: 'maiertechNote', title } as VcImageMeta;
	const ogImageUrl = await getOgImageUrl({ meta: ogImageMeta, apiKey: VIRALCARDS_API_KEY });
	return {
		note: meta,
		seo: { title, description, ogImageUrl }
	};
};
