import type { AvatarType } from '@maiertech/sveltekit-helpers';

const authors: AvatarType[] = [
	{
		id: 'thilo',
		name: 'Thilo Maier',
		url: 'https://maier.social/@thilo',
		imageUrl: '/assets/portrait-thilo-maier.jpg'
	}
];

export function getAuthors(): AvatarType[] {
	return authors;
}
