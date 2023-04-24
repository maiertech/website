import { z } from 'zod';

export default z.object({
	/** SEO title. */
	title: z.string(),
	/** SEO description. */
	description: z.string(),
	/** Canonical URL. */
	canonical_url: z.string().url().optional()
});
