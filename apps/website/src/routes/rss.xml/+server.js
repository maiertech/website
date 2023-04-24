import { top_posts } from '$lib/utils/posts';
import RSS from 'rss';

export const prerender = true;

export async function GET({ url }) {
	const feed = new RSS({
		title: 'Thilo Maier',
		feed_url: `${url.origin}/rss.xml`,
		site_url: `${url.origin}`
	});

	top_posts(10).forEach((post) => {
		feed.item({
			title: post.title,
			description: post.description,
			url: `${url.origin}${post.path}`,
			date: post.published_date
		});
	});

	return new Response(feed.xml(), {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		}
	});
}
