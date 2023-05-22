import { z } from 'zod';

export default z.object({
	/** Path and ID. */
	path: z.string(),
	/** Page and SEO title. */
	title: z.string(),
	/** SEO description. */
	description: z.string(),
	/** Author ID. */
	author: z.string(),
	/** Published date in local system time. */
	published_date: z.string().datetime(),
	/** Topic IDs. */
	topics: z.array(z.string()).optional(),
	/** Tag IDs. */
	tags: z.array(z.string()).optional(),
	/** OG image URL. */
	og_image_url: z.string().url().optional()
});
