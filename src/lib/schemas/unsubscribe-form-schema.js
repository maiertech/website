import { z } from 'zod';

export default z.object({
	email_address: z.string().email({ message: 'Invalid email address.' })
});
