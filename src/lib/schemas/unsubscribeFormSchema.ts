import * as z from 'zod';

export default z.object({
	email_address: z.email({ error: 'Invalid email address.' })
});
