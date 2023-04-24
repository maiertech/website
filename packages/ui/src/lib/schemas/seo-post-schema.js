import { z } from 'zod';
export default z.object({
	/** SEO title. */
	title: z.string(),
	/** SEO description. */
	description: z.string(),
	/** Image URL. */
	image_url: z.string().url().optional(),
	/** Published date. */
	published_date: z.string().datetime(),
	/** Last modified date. */
	lastmod_date: z.string().datetime().optional()
});
