import { ORIGIN } from '$env/static/private';
import { top_posts } from '$lib/utils/posts';
import RSS from 'rss';

export const prerender = true;

export async function GET() {
	const feed = new RSS({
		title: 'Thilo Maier',
		feed_url: `${ORIGIN}/rss.xml`,
		site_url: `${ORIGIN}`
	});

	top_posts(10).forEach((post) => {
		feed.item({
			title: post.title,
			description: post.description,
			url: `${ORIGIN}${post.path}`,
			date: post.published
		});
	});

	return new Response(feed.xml(), {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		}
	});
}
