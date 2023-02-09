import type { z } from 'zod';
import {
	ApiErrorSchema,
	ListSchema,
	SubscribeFormSchema,
	Subscriber,
	UnsubscribeFormSchema
} from './zod-schemas';

export type ApiError = z.infer<typeof ApiErrorSchema>;

export type List = z.infer<typeof ListSchema>;

export type SubscribeForm = z.infer<typeof SubscribeFormSchema>;

/** Subscriber returned from EO API. */
export type Subscriber = z.infer<typeof Subscriber>;

export type UnsubscribeForm = z.infer<typeof UnsubscribeFormSchema>;

/** Validation errors returned by form action. */
export type ValidationErrors = { [field: string]: string[] } | undefined;
