import { linkSchema, seoSchema, subscribeFormSchema } from '$lib/schemas';
import { EmbedOptions, Project } from '@stackblitz/sdk';
import { BlogPosting, WebSite, WithContext } from 'schema-dts';
import type { ComponentType } from 'svelte';
import { z } from 'zod';

// Inferred from local schemas.

export type SeoData = z.infer<typeof seoSchema>;
export type SubscribeForm = z.infer<typeof subscribeFormSchema>;

// Schema.org

export type BlogPosting = WithContext<BlogPosting>;
export type WebSite = WithContext<WebSite>;

// Other types.

export type Color = 'brand' | 'accent';

export type StackBlitzExample = { project: Project; options: EmbedOptions };
