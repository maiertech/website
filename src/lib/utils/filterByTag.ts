import type { ResolvedPost } from '@maiertech/sveltekit-helpers';

/**
 * Filter posts by tag.
 * @param tag - Tag ID to filter posts.
 * @param posts - Posts to be filtered.
 * @returns Filtered posts.
 */
export default function (tag: string, posts: ResolvedPost[]): ResolvedPost[] {
	return posts.filter((post) => {
		if (!post.tags) return false;
		return post.tags.find((t) => t.id === tag);
	});
}
