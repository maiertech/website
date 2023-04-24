import { z } from 'zod';

export default z.object({
	/** SEO title. */
	title: z.string(),
	/** SEO description. */
	description: z.string(),
	/** Image URL. */
	image_url: z.string().url().optional()
});
