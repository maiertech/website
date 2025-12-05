import { ORIGIN } from '$env/static/private';
import { escapeXml } from '$lib/utils';
import { allNotes } from 'content-collections';

export const sorted = allNotes.toSorted((a, b) => {
	return b.publishedDate.localeCompare(a.publishedDate);
});

export const latest = sorted.slice(0, 15);

export const notes2025 = sorted.filter((note) => note.publishedDate.startsWith('2025'));

export const rss = latest.map((note) => ({
	title: note.title,
	description: note.description,
	link: `${ORIGIN}${note.path}`,
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
