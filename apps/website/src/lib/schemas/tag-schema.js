import { z } from 'zod';

export default z.object({
	id: z.string(),
	label: z.string(),
	/** Path to tag page. */
	path: z.string()
});
