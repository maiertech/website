import type { PostType } from '@maiertech/sveltekit-helpers';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/posts');
	const posts = (await response.json()) as PostType[];

	return {
		seo: {
			title: 'All posts',
			description: 'All my posts sorted by published date, the newest first.'
		},
		posts
	};
};
