import type { PageLoad } from './$types';
import type { NoteMetadata } from '$lib/types';

export const load = (async ({ fetch }) => {
	const response = await fetch(`/notes/2025/how-to-write-exceptional-documentation/meta.json`);
	const metadata: NoteMetadata = await response.json();

	return {
		metadata
	};
}) satisfies PageLoad;
