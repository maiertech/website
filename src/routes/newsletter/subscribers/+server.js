import { error } from '@sveltejs/kit';
import { list_info } from '../api';
import { ApiErrorSchema, ListSchema } from '../zod-schemas';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const response = await list_info();

	if (!response.ok) {
		/** @type {import('../zod-types').ApiError} */
		const body = await response.json();
		ApiErrorSchema.parse(body);
		throw error(response.status, body.error.message);
	}

	/** @type {import('../zod-types').List} */
	const list = await response.json();
	ListSchema.parse(list);

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
