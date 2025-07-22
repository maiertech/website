import type { AvatarMeta } from '@maiertech/sveltekit-helpers';
import { resolve } from '@maiertech/sveltekit-helpers';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import authors from './authors';

export const GET: RequestHandler = async ({ params }) => {
	const id = params.id;
	const author = resolve<AvatarMeta>(id, authors);
	if (!author) {
		return error(404, { message: 'Author not found.' });
	}
	return json(author);
};
