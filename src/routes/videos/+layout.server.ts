import { ORIGIN } from '$env/static/private';
import { sorted as videos } from '$lib/server/collections/videos.js';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load: LayoutServerLoad = async ({ url }) => {
	const index = videos.findIndex((video) => video.path === url.pathname);

	if (index === -1) {
		error(404, 'Video not found.');
	}

	const video = videos[index];
	const prev = index < videos.length - 1 ? videos[index + 1] : undefined; // The higher the index the older the video.
	const next = index > 0 ? videos[index - 1] : undefined;

	const recommendedVideos = videos.filter((v) => v.path !== video.path).slice(0, 3);

	return {
		origin: ORIGIN,
		video,
		prev,
		next,
		recommendedVideos,
		seo: {
			title: video.title,
			description: video.description,
			ogImageUrl: video.ogImageUrl
		}
	};
};
