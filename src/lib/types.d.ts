import type { linkSchema, seoSchema, subscribeFormSchema } from '$lib/schemas';
import type { EmbedOptions, Project } from '@stackblitz/sdk';
import type { ComponentType } from 'svelte';
import type { z } from 'zod';

// Inferred from local schemas.

export type SeoData = z.infer<typeof seoSchema>;
export type SubscribeForm = z.infer<typeof subscribeFormSchema>;

// Other types.

export type Color = 'brand' | 'accent';

export type StackBlitzExample = { project: Project; options: EmbedOptions };
