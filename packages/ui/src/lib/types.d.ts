import { AuthorSchema, PostSchema, ResolvedPostSchema, SeoSchema } from '$lib';
import { BlogPosting, Thing, WithContext, WebSite } from 'schema-dts';
import { z } from 'zod';

export type Color = 'brand' | 'accent';

// Inferred from Zod schemas.
export type Author = z.infer<typeof AuthorSchema>;
export type Post = z.infer<typeof PostSchema>;
export type ResolvedPost = z.infer<typeof ResolvedPostSchema>;
export type SeoData = z.infer<typeof SeoSchema>;

// Schema.org
export type BlogPosting = WithContext<BlogPosting>;
export type WebSite = WithContext<WebSite>;
