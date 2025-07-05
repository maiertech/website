import { PUBLIC_URL_ORIGIN } from '$env/static/public';
import type { PostType } from '@maiertech/sveltekit-helpers';
import RSS from 'rss';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch('/api/posts/latest');
	const posts = (await response.json()) as PostType[];

	const feed = new RSS({
		title: 'Thilo Maier',
		feed_url: `${PUBLIC_URL_ORIGIN}/rss.xml`,
		site_url: `${PUBLIC_URL_ORIGIN}`
	});

	posts.forEach((post) => {
		feed.item({
			title: post.title,
			description: post.description,
			url: `${PUBLIC_URL_ORIGIN}${post.path}`,
			date: post.publishedDate
		});
	});

	return new Response(feed.xml(), {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		}
	});
};
