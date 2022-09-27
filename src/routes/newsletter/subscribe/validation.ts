import { z } from 'zod';

// Runtime.
export const SubscribeForm = z.object({
	first_name: z.string().optional(),
	email_address: z.string().email({ message: 'Invalid email address.' })
});

// Compile time.
export type Subscriber = z.infer<typeof SubscribeForm>;
