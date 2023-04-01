import { z } from 'zod';
import LinkSchema from './link-schema';

/** Frontmatter of a post. */
export default z.object({
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
