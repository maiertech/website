import { z } from 'zod';

export default z.object({
	first_name: z.string().optional(),
	email_address: z.string().email({ message: 'Invalid email address.' })
});
