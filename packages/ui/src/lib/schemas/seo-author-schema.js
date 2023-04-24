import { z } from 'zod';

export default z.object({
	name: z.string(),
	url: z.string().optional()
});
