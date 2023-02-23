import { z } from 'zod';

export const FilterSchema = z.object({
	topics: z.array(z.string()).optional(),
	tags: z.array(z.string()).optional(),
	limit: z.number().optional()
});

export const AuthorSchema = z.object({
	id: z.string(),
	name: z.string(),
	mastodonUrl: z.string().optional(),
	twitterUrl: z.string().optional()
});

export const AuthorsSchema = z.array(AuthorSchema);

export const LinkSchema = z.object({
	title: z.string(),
	href: z.string()
});

export const LinksSchema = z.array(LinkSchema);

export const TagSchema = z.object({
	id: z.string(),
	label: z.string(),
	/** Path to tag page. */
	path: z.string()
});

export const TagsSchema = z.array(TagSchema);

export const TopicSchema = z.object({
	id: z.string(),
	label: z.string(),
	/** SEO description. */
	description: z.string(),
	/** Path to topic page. */
	path: z.string()
});

export const TopicsSchema = z.array(TopicSchema);

/** Frontmatter of a post. */
export const PostSchema = z.object({
	id: z.string().optional(),
	slug: z.string().optional(),
	/** Page and SEO title. */
	title: z.string(),
	/** Author ID. */
	author: z.string(),
	/** SEO description. */
	description: z.string(),
	/** Published date in local system time. */
	published: z.string().datetime(),
	/** Modified date in local system time. */
	modified: z.string().datetime(),
	topics: z.array(z.string()).optional(),
	tags: z.array(z.string()).optional(),
	links: z.array(LinkSchema).optional(),
	unpublish: z.boolean().optional()
});

export const PostsSchema = z.array(PostSchema);
