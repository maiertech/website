import { z } from 'zod';

export default z.object({
	title: z.string(),
	href: z.string()
});
