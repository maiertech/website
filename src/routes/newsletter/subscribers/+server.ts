import type { List } from '$models/newsletter.model';
import { error } from '@sveltejs/kit';
import { get_list } from '../api';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const response = await get_list();

	if (!response.ok) {
		const body = (await response.json()) as { error: EmailOctopusApiError };
		throw error(response.status, body.error.message);
	}

	const list = (await response.json()) as List;
	const count = list.counts.subscribed;

	return new Response(JSON.stringify({ count }), {
		headers: {
			'Content-Type': 'application/json',
			// Number of subscribers changes infrequently:
			// - within 120s: serve from shared chache (which is edge due to https)
			// - within 600s: serve stale value and silently refetch
			// - after 600s: fetch value
			'Cache-Control': 's-maxage=120, stale-while-revalidate=600'
		}
	});
};
