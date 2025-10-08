import type { ResolvedPost } from '@maiertech/sveltekit-helpers';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// No need to set `export const prerender = true;`.
// Prerendering is triggered by `/`, which uses this endpoint and iself is prerendered.

// Return latest posts (up to 10).
export const GET: RequestHandler = async ({ fetch }) => {
	const years = ['2025', '2024', '2023'];
	const posts = (
		await Promise.all(
			years.map(async (year) => {
				const response = await fetch(`/api/posts/${year}`);
				return response.json() as Promise<ResolvedPost[]>;
			})
		)
	).flat();

	return json(posts.slice(0, 10));
};
