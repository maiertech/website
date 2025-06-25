import type { AvatarType } from '@maiertech/sveltekit-helpers';
import { resolve } from '@maiertech/sveltekit-helpers';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import authors from './authors';

export const GET: RequestHandler = async ({ params }) => {
	const id = params.id;
	const author = resolve<AvatarType>(id, authors);
	if (!author) {
		return error(404, { message: 'Author not found.' });
	}
	return json(author);
};
