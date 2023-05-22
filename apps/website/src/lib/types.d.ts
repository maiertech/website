import { SubscribeFormSchema } from '$lib/schemas';
import { EmbedOptions, Project } from '@stackblitz/sdk';
import type { ComponentType } from 'svelte';
import {
	AuthorSchema,
	PostSchema,
	ResolvedPostSchema,
	SeoSchema,
	TagSchema,
	TopicSchema
} from 'ui';
import { z } from 'zod';

// Inferred from local schemas.

export type Link = z.infer<typeof LinkSchema>;
export type SubscribeForm = z.infer<typeof SubscribeFormSchema>;

// Types inferred from schemas from UI.

export type Author = z.infer<typeof AuthorSchema>;
export type Post = z.infer<typeof PostSchema>;
export type ResolvedPost = z.infer<typeof ResolvedPostSchema>;
export type SeoData = z.infer<typeof SeoSchema>;
export type Tag = z.infer<typeof TagSchema>;
export type Topic = z.infer<typeof TopicSchema>;

// Other types.

export type Color = 'brand' | 'accent';

export type SocialIcon = {
	readonly id: string;
	title: string;
	href: string;
	component: ComponentType;
	onclick?: () => void;
};

export type NotUndefined<T> = (item: T | undefined) => item is T;

export type StackBlitzExample = { project: Project; options: EmbedOptions };
