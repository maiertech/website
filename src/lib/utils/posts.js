import all_posts from '$lib/data/posts';

/**
 * Resolve a post by its path.
 * @param {string} path - Path to be resolved.
 * @param {import('$lib/types').Post[]} [posts] - Posts in which path gets resolved.
 * @returns {import('$lib/types').Post | undefined} Resolved post.
 */
export function resolve(path, posts = all_posts) {
	return posts.find((p) => p.path === path);
}

/**
 * Filter posts by topic.
 * @param {string} topic - Topic ID to filter posts.
 * @param {import('$lib/types').Post[]} [posts] - Posts to be filtered.
 * @returns {import('$lib/types').Post[]} Filtered posts.
 */
export function filter_by_topic(topic, posts = all_posts) {
	return posts.filter((post) => {
		if (!post.topics) return false;
		return post.topics.find((t) => t === topic);
	});
}

/**
 * Filter posts by tag.
 * @param {string} tag - Tag ID to filter posts.
 * @param {import('$lib/types').Post[]} [posts] - Posts to be filtered.
 * @returns {import('$lib/types').Post[]} Filtered posts.
 */
export function filter_by_tag(tag, posts = all_posts) {
	return posts.filter((post) => {
		if (!post.tags) return false;
		return post.tags.find((t) => t === tag);
	});
}

/**
 * Select first n posts.
 * @param {number} n - Number of posts to be selected.
 * @param {import('$lib/types').Post[]} [posts] - Array from which posts are selected.
 * @returns {import('$lib/types').Post[]} Selected posts.
 */
export function top_posts(n, posts = all_posts) {
	return posts.slice(0, n);
}
