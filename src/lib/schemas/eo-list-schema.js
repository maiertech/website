import { z } from 'zod';

export default z.object({
	id: z.string(),
	name: z.string(),
	counts: z.object({
		pending: z.number(),
		subscribed: z.number(),
		unsubscribed: z.number()
	})
});
