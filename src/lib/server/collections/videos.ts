import { ORIGIN } from '$env/static/private';
import { escapeXml } from '$lib/utils';
import { allVideos } from 'content-collections';

export const sorted = allVideos.toSorted((a, b) => {
	return b.publishedDate.localeCompare(a.publishedDate);
});

export const latest = sorted.slice(0, 10);

export const videos2026 = sorted.filter((video) => video.publishedDate.startsWith('2026'));
export const videos2025 = sorted.filter((video) => video.publishedDate.startsWith('2025'));

export const rss = latest.map((video) => ({
	title: video.title,
	description: video.description,
	link: `${ORIGIN}${video.path}`,
	pubDate: new Date(video.publishedDate).toUTCString(),
	category: 'Video',
	enclosure: video.thumbnailUrl
		? {
				// Replace `&` in URLs with `&amp;` to ensure valid XML.
				url: escapeXml(video.thumbnailUrl),
				type: 'image/jpeg',
				length: 0 // We don't know the size of the image.
			}
		: undefined
}));
