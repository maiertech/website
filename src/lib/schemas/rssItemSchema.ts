import * as z from 'zod';

export default z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	link: z.url(),
	language: z.literal('en-US'),
	pubDate: z.iso.datetime(),
	/** Generally, there can be multiple categories. But in our case at most one. */
	category: z.enum(['Post', 'Note']).optional(),
	enclosure: z
		.object({
			url: z.url(),
			type: z.literal('image/png'),
			length: z.int().nonnegative().optional()
		})
		.optional()
});
