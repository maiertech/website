import { z } from 'zod';

export default z.object({
	/** Page and SEO title. */
	title: z.string(),
	/** Author ID. */
	author: z.string(),
	/** SEO description. */
	description: z.string(),
	/** Published date in local system time. */
	published: z.string().datetime(),
	topics: z.array(z.string()).optional(),
	tags: z.array(z.string()).optional(),
	path: z.string()
});
