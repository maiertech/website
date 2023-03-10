import posts from '$lib/data/posts';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const topic = url.searchParams.get('topic');
	const tag = url.searchParams.get('tag');
	const limit = Number(url.searchParams.get('limit'));

	let filtered_posts = posts;

	if (topic) {
		filtered_posts = filtered_posts.filter((post) => {
			if (!post.topics) return false;
			return post.topics.find((t) => t === topic);
		});
	}

	if (tag) {
		filtered_posts = filtered_posts.filter((post) => {
			if (!post.tags) return false;
			return post.tags.find((t) => t === tag);
		});
	}

	if (limit) {
		filtered_posts = filtered_posts.slice(0, limit);
	}

	return json(filtered_posts);
}
