import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { NoteType } from '@maiertech/sveltekit-helpers';

// No need to set `export const prerender = true;`.
// Prerendering is triggered by `/`, which uses this endpoint and iself is prerendered.

// Return latest notes (up to 20).
export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch('/api/notes/2025');
	const notes = (await response.json()) as NoteType[];

	return json(notes.slice(0, 20));
};
