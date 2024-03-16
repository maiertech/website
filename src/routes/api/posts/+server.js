import all_posts from '$lib/data/posts';
import { json } from '@sveltejs/kit';
import { filter_by_topic, filter_by_tag, top_posts } from '$lib/utils/posts';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const topic = url.searchParams.get('topic');
	const tag = url.searchParams.get('tag');
	const limit = Number(url.searchParams.get('limit'));

	let posts = all_posts;

	if (topic) {
		posts = filter_by_topic(topic, posts);
	}

	if (tag) {
		posts = filter_by_tag(tag, posts);
	}

	if (limit) {
		posts = top_posts(limit, posts);
	}

	return json(posts);
}
