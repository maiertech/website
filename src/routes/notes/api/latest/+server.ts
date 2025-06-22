import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { NoteType } from '@maiertech/sveltekit-helpers';

export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch('/notes/api/2025');
	const notes = (await response.json()) as NoteType[];

	return json(notes.slice(0, 10));
};
