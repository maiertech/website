import { z } from 'zod';

export default z.object({
	id: z.string(),
	name: z.string(),
	url: z.string().url().optional(),
	image_url: z.string().url().optional()
});
