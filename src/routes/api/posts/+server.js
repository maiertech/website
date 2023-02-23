import posts from '$lib/data/posts';
import { error, json } from '@sveltejs/kit';
import { FilterSchema } from '$lib/schemas/content';

export const prerender = false;

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	// Validate payload (filter).
	const result = FilterSchema.safeParse(await request.json());

	if (!result.success) {
		throw error(400, 'Payload validation failed.');
	}

	const filter = result.data;
	let filtered_posts = posts;

	if (filter.topics) {
		const topics = filter.topics;
		filtered_posts = filtered_posts.filter((post) => {
			if (!post.topics) return false;
			return post.topics.some((topic) => topics.includes(topic));
		});
	}

	if (filter.tags) {
		const tags = filter.tags;
		filtered_posts = filtered_posts.filter((post) => {
			if (!post.tags) return false;
			return post.tags.some((tag) => tags.includes(tag));
		});
	}

	if (filter.limit) {
		filtered_posts = filtered_posts.slice(0, filter.limit);
	}

	// return json(filteredPosts);
	return json(filtered_posts);
}
