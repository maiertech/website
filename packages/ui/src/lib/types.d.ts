import {
	SeoAuthorSchema,
	SeoDefaultSchema,
	SeoPostSchema,
	SeoWebsiteSchema,
	ElementTypeSchema
} from '$lib';
import { Thing, WithContext } from 'schema-dts';
import type { z } from 'zod';

export type SeoAuthorData = z.infer<typeof SeoAuthorSchema>;
export type SeoDefaultData = z.infer<typeof SeoDefaultSchema>;
export type SeoPostData = z.infer<typeof SeoPostSchema>;
export type SeoWebsiteData = z.infer<typeof SeoWebsiteSchema>;
export type ElementType = z.infer<typeof ElementTypeSchema>;

export type Schema = Thing | WithContext<Type>;
