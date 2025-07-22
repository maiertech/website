import type { Tag } from '@maiertech/sveltekit-helpers';
import { resolve } from '@maiertech/sveltekit-helpers';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import tags from './tags';

// Include this endpoint into the manifest.
// This ensures that dynamic calls for tags that have not been prerendered still work.
export const prerender = 'auto';

export const GET: RequestHandler = async ({ params }) => {
	const id = params.id;
	const tag = resolve<Tag>(id, tags);
	if (!tag) {
		return error(404, { message: 'Tag not found.' });
	}
	return json(tag);
};
