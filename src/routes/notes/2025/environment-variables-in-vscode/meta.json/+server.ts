import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { NoteMetadata } from '$lib/types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const metadata: NoteMetadata = {
		title: 'Environment variables in VS Code',
		date: '2025-03-06'
	};
	return json(metadata);
};
