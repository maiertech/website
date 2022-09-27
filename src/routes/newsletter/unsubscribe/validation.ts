import { z } from 'zod';

// Runtime.
export const UnsubscribeForm = z.object({
	email_address: z.string().email({ message: 'Invalid email address.' })
});

// Compile time.
export type Unsubscriber = z.infer<typeof UnsubscribeForm>;
