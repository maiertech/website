import { PUBLIC_CANONICAL_ORIGIN } from '$env/static/public';
import { top_posts } from '$lib/utils/posts';
import RSS from 'rss';

export const prerender = true;

export async function GET() {
	const feed = new RSS({
		title: 'Thilo Maier',
		feed_url: `${PUBLIC_CANONICAL_ORIGIN}/rss.xml`,
		site_url: `${PUBLIC_CANONICAL_ORIGIN}`
	});

	top_posts(10).forEach((post) => {
		feed.item({
			title: post.title,
			description: post.description,
			url: `${PUBLIC_CANONICAL_ORIGIN}${post.path}`,
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
