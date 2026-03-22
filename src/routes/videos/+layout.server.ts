import { ORIGIN } from '$env/static/private';
import { sorted as videos } from '$lib/server/collections/videos.js';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load: LayoutServerLoad = async ({ url }) => {
	const video = videos.find((video) => video.path === url.pathname);

	if (!video) {
		error(404, 'Video not found.');
	}

	return {
		origin: ORIGIN,
		video,
		seo: {
			title: video.title,
			description: video.description,
			ogImageUrl: video.ogImageUrl
		}
	};
};
