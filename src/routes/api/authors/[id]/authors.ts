import type { AvatarMeta } from '@maiertech/sveltekit-helpers';
import { getFullOrigin } from '$lib/utils';
import { VERCEL_URL } from '$env/static/private';

const fullOrigin = getFullOrigin(VERCEL_URL);

export default [
	{
		id: 'thilo',
		name: 'Thilo Maier',
		url: 'https://bsky.app/profile/maier.tech',
		imageUrl: `${fullOrigin}/assets/portrait-thilo-maier.jpg`
	}
] satisfies AvatarMeta[];
