import { z } from 'zod';

export const EOApiErrorSchema = z.object({
	error: z.object({
		code: z.string(),
		message: z.string()
	})
});

export const EOListSchema = z.object({
	id: z.string(),
	name: z.string(),
	counts: z.object({
		pending: z.number(),
		subscribed: z.number(),
		unsubscribed: z.number()
	})
});

export const SubscribeFormSchema = z.object({
	first_name: z.string().optional(),
	email_address: z.string().email({ message: 'Invalid email address.' })
});

export const EOSubscriber = z.object({
	id: z.string(),
	email_address: z.string().email({ message: 'Invalid email address.' }),
	fields: z.object({
		FirstName: z.string()
	}),
	status: z.enum(['SUBSCRIBED', 'PENDING', 'UNSUBSCRIBED'])
});

export const UnsubscribeFormSchema = z.object({
	email_address: z.string().email({ message: 'Invalid email address.' })
});
