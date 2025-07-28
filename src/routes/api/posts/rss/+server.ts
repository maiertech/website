import { PUBLIC_URL_ORIGIN } from '$env/static/public';
import type { RssItem } from '$lib/types';
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
		link: `${PUBLIC_URL_ORIGIN}${post.path}`,
		language: 'en-US',
		pubDate: new Date(post.publishedDate).toUTCString(),
		category: 'Post',
		enclosure: post.ogImageUrl
			? {
					url: post.ogImageUrl,
					type: 'image/png',
					length: 0 // We don't know the size of the image.
				}
			: undefined
	}));

	return json(rssItems);
};
