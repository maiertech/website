import * as z from 'zod';

export default z.object({
	first_name: z.string().optional(),
	email_address: z.email({ error: 'Invalid email address.' })
});
