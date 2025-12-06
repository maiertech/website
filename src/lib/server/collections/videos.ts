import { allVideos } from 'content-collections';

export const sorted = allVideos.toSorted((a, b) => {
	return b.publishedDate.localeCompare(a.publishedDate);
});

export const latest = sorted.slice(0, 15);

export const videos2025 = sorted.filter((video) => video.publishedDate.startsWith('2025'));
