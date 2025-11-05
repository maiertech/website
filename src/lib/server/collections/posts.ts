import { allPosts } from 'content-collections';
import { ORIGIN } from '$env/static/private';
import { escapeXml } from '$lib/utils';

export const all = allPosts.toSorted((a, b) => {
	return b.publishedDate.localeCompare(a.publishedDate);
});

export const latest = all.slice(0, 15);

export const posts2025 = all.filter((post) => post.publishedDate.startsWith('2025'));
export const posts2024 = all.filter((post) => post.publishedDate.startsWith('2024'));
export const posts2023 = all.filter((post) => post.publishedDate.startsWith('2023'));
export const posts2022 = all.filter((post) => post.publishedDate.startsWith('2022'));
export const posts2021 = all.filter((post) => post.publishedDate.startsWith('2021'));

export const rss = latest.map((post) => ({
	title: post.title,
	description: post.description,
	link: `${ORIGIN}${post.path}`,
	pubDate: new Date(post.publishedDate).toUTCString(),
	category: 'Post',
	enclosure: post.ogImageUrl
		? {
				// Replace `&` in URLs with `&amp;` to ensure valid XML.
				url: escapeXml(post.ogImageUrl),
				type: 'image/png',
				length: 0 // We don't know the size of the image.
			}
		: undefined
}));
