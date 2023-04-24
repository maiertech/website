import posts from '$lib/data/posts';

export async function load() {
	return {
		title: 'All posts',
		description: 'All my posts sorted by published date, the newest first.',
		posts
	};
}
