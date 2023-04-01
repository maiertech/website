import { z } from 'zod';

export default z.object({
	id: z.string(),
	email_address: z.string().email({ message: 'Invalid email address.' }),
	fields: z.object({
		FirstName: z.string()
	}),
	status: z.enum(['SUBSCRIBED', 'PENDING', 'UNSUBSCRIBED'])
});
