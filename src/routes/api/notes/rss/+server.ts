import { VERCEL_URL } from '$env/static/private';
import type { RssItem } from '$lib/types';
import { escapeXml, getFullOrigin } from '$lib/utils';
import type { NoteMeta } from '@maiertech/sveltekit-helpers';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = true;

const fullOrigin = getFullOrigin(VERCEL_URL);

export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch('/api/notes/latest');
	const notes = (await response.json()) as NoteMeta[];

	const rssItems: RssItem[] = notes.map((note) => ({
		title: note.title,
		description: note.description,
		link: `${fullOrigin}${note.path}`,
		pubDate: new Date(note.publishedDate).toUTCString(),
		category: 'Note',
		enclosure: note.ogImageUrl
			? {
					// Replace `&` in URLs with `&amp;` to ensure valid XML.
					url: escapeXml(note.ogImageUrl),
					type: 'image/png',
					length: 0 // We don't know the size of the image.
				}
			: undefined
	}));

	return json(rssItems);
};
