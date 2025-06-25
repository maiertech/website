import type { TagType } from '@maiertech/sveltekit-helpers';
import { resolve } from '@maiertech/sveltekit-helpers';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import tags from './tags';

export const GET: RequestHandler = async ({ params }) => {
	const id = params.id;
	const tag = resolve<TagType>(id, tags);
	if (!tag) {
		return error(404, { message: 'Tag not found.' });
	}
	return json(tag);
};
