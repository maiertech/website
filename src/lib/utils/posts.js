import all_posts from '$lib/data/posts';
import { PostFrontmatterSchema } from '@maiertech/sveltekit-helpers';
import { z } from 'zod';

/**
 * Resolve a post by its path.
 * @param {string} path - Path to be resolved.
 * @param {(z.infer<typeof PostFrontmatterSchema> & { path: string })[]} [posts] - Posts in which path gets resolved.
 * @returns { z.infer<typeof PostFrontmatterSchema> & { path: string } | undefined } Resolved post.
 */
export function resolve(path, posts = all_posts) {
	return posts.find((p) => p.path === path);
}

/**
 * Filter posts by tag.
 * @param {string} tag - Tag ID to filter posts.
 * @param {(z.infer<typeof PostFrontmatterSchema> & { path: string })[]} [posts] - Posts to be filtered.
 * @returns {(z.infer<typeof PostFrontmatterSchema> & { path: string })[]} Filtered posts.
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
 * @param {(z.infer<typeof PostFrontmatterSchema> & { path: string })[]} [posts] - Array from which posts are selected.
 * @returns {(z.infer<typeof PostFrontmatterSchema> & { path: string })[]} Selected posts.
 */
export function top_posts(n, posts = all_posts) {
	return posts.slice(0, n);
}
