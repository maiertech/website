import { subscribeFormSchema, noteMetadataSchema } from '$lib/schemas';
import type { EmbedOptions, Project } from '@stackblitz/sdk';
import type { z } from 'zod';

// Inferred from schemas.
export type NoteMetadata = z.infer<typeof noteMetadataSchema>;
export type SubscribeForm = z.infer<typeof subscribeFormSchema>;

// Other types.

export type Color = 'brand' | 'accent';

export type StackBlitzExample = { project: Project; options: EmbedOptions };
