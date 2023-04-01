import { z } from 'zod';

export default z.object({
	error: z.object({
		code: z.string(),
		message: z.string()
	})
});
