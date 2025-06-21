import { z } from 'zod';

export default z.object({
	title: z.string(),
	date: z.string(),
	link: z.string().url().optional(),
	path: z.string()
});
