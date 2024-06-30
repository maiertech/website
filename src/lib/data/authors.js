import { authorSchema } from '@maiertech/sveltekit-helpers';
import { z } from 'zod';

/** @type {z.infer<typeof authorSchema>[]} */
export default [
	{
		id: 'thilo',
		name: 'Thilo Maier',
		url: 'https://maier.social/@thilo',
		imageUrl: '/assets/portrait-thilo-maier.jpg'
	}
];
