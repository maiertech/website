import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { NoteType } from '@maiertech/sveltekit-helpers';

// Return all notes.
export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch('/api/notes/2025');
	const notes = (await response.json()) as NoteType[];

	return json(notes);
};
