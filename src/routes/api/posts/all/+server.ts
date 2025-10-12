import type { ResolvedPost } from '@maiertech/sveltekit-helpers';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Needs to be set explicitly because we prerender endpoint `/sitemap.xml`.
// export const prerender = true;

// Return all posts.
export const GET: RequestHandler = async ({ fetch }) => {
	const years = ['2025', '2024', '2023', '2022', '2021'];
	const posts = (
		await Promise.all(
			years.map(async (year) => {
				const response = await fetch(`/api/posts/${year}`);
				return response.json() as Promise<ResolvedPost[]>;
			})
		)
	).flat();

	return json(posts);
};
