import { z } from 'zod';

export default z.object({
	id: z.string(),
	name: z.string(),
	mastodonUrl: z.string().optional(),
	twitterUrl: z.string().optional()
});
