import type { z } from 'zod';
import {
	SeoAuthorSchema,
	SeoDefaultSchema,
	SeoPostSchema,
	SeoWebsiteSchema,
	TypeSchema
} from '$lib';

export type SeoAuthor = z.infer<typeof SeoAuthorSchema>;
export type SeoDefault = z.infer<typeof SeoDefaultSchema>;
export type SeoPost = z.infer<typeof SeoPostSchema>;
export type SeoWebsite = z.infer<typeof SeoWebsiteSchema>;
export type Type = z.infer<typeof TypeSchema>;
