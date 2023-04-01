import type { ComponentType } from 'svelte';
import { TypeSchema } from 'ui';
import {
	AuthorSchema,
	PostSchema,
	SubscribeFormSchema,
	TagSchema,
	TopicSchema
} from '$lib/schemas';
import { z } from 'zod';

// Types inferred from local schemas.

export type Author = z.infer<typeof AuthorSchema>;
export type Link = z.infer<typeof LinkSchema>;
export type Post = z.infer<typeof PostSchema>;
export type SubscribeForm = z.infer<typeof SubscribeFormSchema>;
export type Tag = z.infer<typeof TagSchema>;
export type Topic = z.infer<typeof TopicSchema>;

// Types inferred from UI schemas.

export type Type = z.infer<typeof TypeSchema>;

// Other types.

export type SocialIcon = {
	readonly id: string;
	title: string;
	href: string;
	component: ComponentType;
	onclick?: () => void;
};
