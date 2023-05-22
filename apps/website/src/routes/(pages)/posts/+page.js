import posts from '$lib/data/posts';

export async function load() {
	return {
		seo: {
			title: 'All posts',
			description: 'All my posts sorted by published date, the newest first.'
		},
		posts
	};
}
