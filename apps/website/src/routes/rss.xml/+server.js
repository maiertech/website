import { error } from '@sveltejs/kit';
import { PostsSchema } from '$lib/schemas/content';
import RSS from 'rss';
import { ORIGIN } from '$env/static/private';

export async function GET({ fetch }) {
	const feed = new RSS({
		title: 'Thilo Maier',
		feed_url: `${ORIGIN}/rss.xml`,
		site_url: `${ORIGIN}`
	});

	// Fetch latest 10 posts.
	const response = await fetch(`/api/posts/filter?${new URLSearchParams({ limit: '10' })}`);

	if (!response.ok) {
		throw error(500, 'Failed to fetch posts.');
	}

	const result = PostsSchema.safeParse(await response.json());

	if (!result.success) {
		throw error(500, 'Posts failed validation.');
	}

	result.data.forEach((post) => {
		feed.item({
			title: post.title,
			description: post.description,
			url: `${ORIGIN}/posts/${post.slug}`,
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