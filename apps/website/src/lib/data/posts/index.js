import { PostSchema } from '$lib/schemas/content';
import slugify from '$lib/utils/slugify';

/** @typedef {import('zod').z.infer<typeof import('$lib/schemas/content').PostSchema>} Post */

/**
 * With option eager Vite immediately imports all matching files (with mdsvex processing).
 * @type {Record<string, { metadata: Post}>}
 */
const files = import.meta.glob('/src/lib/content/posts/**/*.md', {
	eager: true
});

const posts = Object.entries(files)
	.map(([path, post]) => {
		// Validate frontmatter.
		const result = PostSchema.safeParse(post.metadata);

		if (!result.success) {
			throw new Error(`Frontmatter of file ${path} failed validation.`);
		}

		const frontmatter = result.data;

		const slug = slugify(frontmatter.title);

		// User folder name as post ID (not slug!).
		const id = path
			.replace(/(\/index)?\.md/, '')
			.split('/')
			.pop();

		// Frontmatter can override slug but not id.
		return {
			slug,
			...frontmatter,
			id
		};
	})
	// Remove posts with an unpublish flag.
	.filter((p) => !p.unpublish)
	// Remove posts with published date in the future.
	.filter((p) => new Date(p.published).getTime() <= new Date().getTime())
	// Sort posts by published date descending.
	.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());

export default posts;
