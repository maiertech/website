import {
	SeoAuthorSchema,
	SeoDefaultSchema,
	SeoPostSchema,
	SeoWebsiteSchema,
	TypeSchema
} from '$lib';
import { Thing, WithContext } from 'schema-dts';
import type { z } from 'zod';

export type SeoAuthor = z.infer<typeof SeoAuthorSchema>;
export type SeoDefault = z.infer<typeof SeoDefaultSchema>;
export type SeoPost = z.infer<typeof SeoPostSchema>;
export type SeoWebsite = z.infer<typeof SeoWebsiteSchema>;
export type Type = z.infer<typeof TypeSchema>;

export type Schema = Thing | WithContext<Type>;
