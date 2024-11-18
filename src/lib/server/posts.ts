import type { PostFrontmatter } from '@maiertech/sveltekit-helpers';
import { postFrontmatterSchema } from '@maiertech/sveltekit-helpers';
import { error } from '@sveltejs/kit';

export function getPosts(): (PostFrontmatter & { path: string })[] {
	// Escape `(` and `)`. Otherwise they define a capture group that matches `posts` instead of `(posts)`.
	const globs = import.meta.glob('/src/routes/\\(posts\\)/posts/**/*.markdoc', {
		eager: true
	});

	const posts = Object.entries(globs).map(([filepath, post]) => {
		const { frontmatter } = post as { frontmatter: PostFrontmatter };

		// Validate.
		const result = postFrontmatterSchema.safeParse(frontmatter);
		if (!result.success) {
			error(500, `Invalid frontmatter in ${filepath}: ${result.error.message}`);
		}

		const path = filepath.replace('/src/routes/(posts)', '').replace('/+page.markdoc', '');

		// TODO Resolve author and tags. This can be done here as soon as all posts have been converted to Markdoc.
		return {
			...frontmatter,
			path
		};
	});

	return posts.sort(
		(a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
	);
}
