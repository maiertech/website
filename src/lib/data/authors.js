import { AuthorSchema } from '@maiertech/sveltekit-helpers';
import { z } from 'zod';

/** @type {z.infer<typeof AuthorSchema>[]} */
export default [
	{
		id: 'thilo',
		name: 'Thilo Maier',
		url: 'https://maier.social/@thilo',
		image_url: '/assets/portrait-thilo-maier.jpg'
	}
];
