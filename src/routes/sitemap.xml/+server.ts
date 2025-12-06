import { ORIGIN } from '$env/static/private';
import { sorted as notes } from '$lib/server/collections/notes.js';
import { sorted as posts } from '$lib/server/collections/posts.js';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	// Create sitemap entries for posts.
	const postEntries = posts.map(
		(post) => `\t<url>
		<loc>${ORIGIN}${post.path}</loc>
		<lastmod>${post.lastmodDate ? post.lastmodDate : post.publishedDate}</lastmod>
	</url>`
	);

	// Create sitemap entries for notes.
	const noteEntries = notes.map(
		(note) => `\t<url>
		<loc>${ORIGIN}${note.path}</loc>
		<lastmod>${note.publishedDate}</lastmod>
	</url>`
	);

	// Add additional collections to this array.
	const pages = [...postEntries, ...noteEntries];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		}
	});
};
