import { z } from 'zod';

export default z.object({
	commit: z.object({
		author: z.object({
			date: z.string().datetime()
		})
	})
});
