import type { LayoutServerLoad } from './$types';
import { sorted as videos } from '$lib/server/collections/videos.js';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const load: LayoutServerLoad = async ({ url }) => {
	const video = videos.find((video) => video.path === url.pathname);

	if (!video) {
		error(404, 'Video not found.');
	}

	return {
		video,
		seo: {
			title: video.title,
			description: video.description,
			ogImageUrl: video.ogImageUrl
		}
	};
};
