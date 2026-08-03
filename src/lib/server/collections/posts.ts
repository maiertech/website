import { allPosts } from 'content-collections';
import { ORIGIN } from '$env/static/private';
import { escapeXml } from '$lib/utils';

export const sorted = allPosts
	.filter((post) => post.published !== false) // Quick way to unpublish a post.
	.toSorted((a, b) => {
		return b.publishedDate.localeCompare(a.publishedDate);
	});

export const latest = sorted.slice(0, 10);

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
