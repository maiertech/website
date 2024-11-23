import { PUBLIC_CANONICAL_ORIGIN } from '$env/static/public';
import { getPosts } from '$lib/server/data';
import { topPosts } from '$lib/utils/posts';
import RSS from 'rss';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const feed = new RSS({
		title: 'Thilo Maier',
		feed_url: `${PUBLIC_CANONICAL_ORIGIN}/rss.xml`,
		site_url: `${PUBLIC_CANONICAL_ORIGIN}`
	});

	topPosts(10, getPosts()).forEach((post) => {
		feed.item({
			title: post.title,
			description: post.description,
			url: `${PUBLIC_CANONICAL_ORIGIN}${post.path}`,
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
