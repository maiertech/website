import all_posts from '$lib/data/posts';

/**
 * @param {string} path
 * @param {import('$lib/types').Post[]} [posts]
 */
export function resolve(path, posts = all_posts) {
	return posts.find((p) => p.path === path);
}

/**
 * @param {string} topic
 * @param {import('$lib/types').Post[]} [posts]
 */
export function filter_by_topic(topic, posts = all_posts) {
	return posts.filter((post) => {
		if (!post.topics) return false;
		return post.topics.find((t) => t === topic);
	});
}

/**
 * @param {string} tag
 * @param {import('$lib/types').Post[]} [posts]
 */
export function filter_by_tag(tag, posts = all_posts) {
	return posts.filter((post) => {
		if (!post.tags) return false;
		return post.tags.find((t) => t === tag);
	});
}

/**
 * @param {number} limit
 * @param {import('$lib/types').Post[]} [posts]
 */
export function top_posts(limit, posts = all_posts) {
	return posts.slice(0, limit);
}
