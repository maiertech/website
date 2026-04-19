import { ORIGIN } from '$env/static/private';
import { sorted as guides } from '$lib/server/collections/guides.js';
import { latest as latestVideos } from '$lib/server/collections/videos.js';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load: LayoutServerLoad = async ({ url }) => {
	const index = guides.findIndex((guide) => guide.path === url.pathname);

	if (index === -1) {
		error(404, 'Guide not found.');
	}

	const guide = guides[index];
	const prev = index > 0 ? guides[index - 1] : undefined;
	const next = index < guides.length - 1 ? guides[index + 1] : undefined;

	const recommendedVideos = latestVideos.slice(0, 3);

	return {
		origin: ORIGIN,
		guide,
		prev,
		next,
		recommendedVideos,
		seo: {
			title: guide.title,
			description: guide.description,
			ogImageUrl: guide.ogImageUrl
		}
	};
};
