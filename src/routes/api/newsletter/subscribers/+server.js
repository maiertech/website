import { error } from '@sveltejs/kit';
import { get_list_info } from '$lib/utils/eo-api';
import { EOListSchema } from '$lib/schemas';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const response = await get_list_info();

	if (!response.ok) {
		error(500, 'Failed to fetch list info.');
	}

	// Validate list info.
	const result = EOListSchema.safeParse(await response.json());

	if (!result.success) {
		error(500, 'List info failed validation.');
	}

	const list = result.data;
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
}
