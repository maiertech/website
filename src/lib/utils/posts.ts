import type { ResolvedPost } from '@maiertech/sveltekit-helpers';

/**
 * Filter posts by tag.
 * @param tag - Tag ID to filter posts.
 * @param posts - Posts to be filtered.
 * @returns Filtered posts.
 */
export function filterByTag(tag: string, posts: ResolvedPost[]): ResolvedPost[] {
	return posts.filter((post) => {
		if (!post.tags) return false;
		return post.tags.find((t) => t.id === tag);
	});
}

/**
 * Select first n posts.
 * @param n - Number of posts to be selected.
 * @param posts - Array from which posts are selected.
 * @returns Selected posts.
 */
export function topPosts(n: number, posts: ResolvedPost[]): ResolvedPost[] {
	return posts.slice(0, n);
}
