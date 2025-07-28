import { PUBLIC_URL_ORIGIN } from '$env/static/public';
import type { RssItem } from '$lib/types';
import { escapeXml } from '$lib/utils/escapeXml';
import type { NoteMeta } from '@maiertech/sveltekit-helpers';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch('/api/notes/latest');
	const notes = (await response.json()) as NoteMeta[];

	const rssItems: RssItem[] = notes.map((note) => ({
		title: escapeXml(note.title),
		description: escapeXml(note.description),
		link: `${PUBLIC_URL_ORIGIN}${note.path}`,
		language: 'en-US',
		pubDate: new Date(note.publishedDate).toUTCString(),
		category: 'Note',
		enclosure: note.ogImageUrl
			? {
					url: escapeXml(note.ogImageUrl),
					type: 'image/png',
					length: 0 // We don't know the size of the image.
				}
			: undefined
	}));

	return json(rssItems);
};
