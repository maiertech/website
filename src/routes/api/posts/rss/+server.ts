import { ORIGIN } from '$env/static/private';
import type { RssItem } from '$lib/types';
import { escapeXml } from '$lib/utils';
import type { ResolvedPost } from '@maiertech/sveltekit-helpers';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch('/api/posts/latest');
	const posts = (await response.json()) as ResolvedPost[];

	const rssItems: RssItem[] = posts.map((post) => ({
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

	return json(rssItems);
};
