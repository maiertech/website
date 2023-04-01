import { z } from 'zod';

export default z.object({
	id: z.string(),
	label: z.string(),
	/** SEO description. */
	description: z.string(),
	/** Path to topic page. */
	path: z.string()
});
