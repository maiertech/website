import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { NoteMeta } from '@maiertech/sveltekit-helpers';

export const prerender = true;

// Return all notes.
export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch('/api/notes/2025');
	const notes = (await response.json()) as NoteMeta[];

	return json(notes);
};
