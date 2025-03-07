import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { NoteMetadata } from '$lib/types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const metadata: NoteMetadata = {
		title: 'How to write exceptional documentation',
		date: '2025-03-07',
		link: 'https://chrisnicholas.dev/blog/how-to-write-exceptional-documentation'
	};
	return json(metadata);
};
