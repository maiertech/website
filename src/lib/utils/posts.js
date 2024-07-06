import { posts as allPosts } from '$lib/data';

/**
 * Filter posts by tag.
 * @param {string} tag - Tag ID to filter posts.
 * @param {(import('zod').z.infer<typeof import('@maiertech/sveltekit-helpers').postFrontmatterSchema> & { path: string })[]} [posts] - Posts to be filtered.
 * @returns {(import('zod').z.infer<typeof import('@maiertech/sveltekit-helpers').postFrontmatterSchema> & { path: string })[]} Filtered posts.
 */
export function filterByTag(tag, posts = allPosts) {
	return posts.filter((post) => {
		if (!post.tags) return false;
		return post.tags.find((t) => t === tag);
	});
}

/**
 * Select first n posts.
 * @param {number} n - Number of posts to be selected.
 * @param {(import('zod').z.infer<typeof import('@maiertech/sveltekit-helpers').postFrontmatterSchema> & { path: string })[]} [posts] - Array from which posts are selected.
 * @returns {(import('zod').z.infer<typeof import('@maiertech/sveltekit-helpers').postFrontmatterSchema> & { path: string })[]} Selected posts.
 */
export function topPosts(n, posts = allPosts) {
	return posts.slice(0, n);
}
