import { z } from 'zod';
import AuthorSchema from './author-schema';
import TagSchema from './tag-schema';
import TopicSchema from './topic-schema';

export default z.object({
	/** Path and ID. */
	path: z.string(),
	/** Page and SEO title. */
	title: z.string(),
	/** SEO description. */
	description: z.string(),
	/**
	 * Resolved author.
	 * Can be undefined when it cannot be resolved.
	 */
	author: AuthorSchema.optional(),
	/** Published date in local system time. */
	published_date: z.string().datetime(),
	/** Last modified date. */
	lastmod_date: z.string().datetime().optional(),
	/** Resolved topics. */
	topics: z.array(TopicSchema).optional(),
	/** Resolved tags. */
	tags: z.array(TagSchema).optional(),
	/** OG image URL. */
	og_image_url: z.string().url().optional()
});
