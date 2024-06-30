import allPosts from '$lib/data/posts';
import { postFrontmatterSchema } from '@maiertech/sveltekit-helpers';
import { z } from 'zod';

/**
 * Resolve a post by its path.
 * @param {string} path - Path to be resolved.
 * @param {(z.infer<typeof postFrontmatterSchema> & { path: string })[]} [posts] - Posts in which path gets resolved.
 * @returns { z.infer<typeof postFrontmatterSchema> & { path: string } | undefined } Resolved post.
 */
export function resolve(path, posts = allPosts) {
	return posts.find((p) => p.path === path);
}

/**
 * Filter posts by tag.
 * @param {string} tag - Tag ID to filter posts.
 * @param {(z.infer<typeof postFrontmatterSchema> & { path: string })[]} [posts] - Posts to be filtered.
 * @returns {(z.infer<typeof postFrontmatterSchema> & { path: string })[]} Filtered posts.
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
 * @param {(z.infer<typeof postFrontmatterSchema> & { path: string })[]} [posts] - Array from which posts are selected.
 * @returns {(z.infer<typeof postFrontmatterSchema> & { path: string })[]} Selected posts.
 */
export function topPosts(n, posts = allPosts) {
	return posts.slice(0, n);
}
