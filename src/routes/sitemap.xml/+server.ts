import { PUBLIC_URL_ORIGIN } from '$env/static/public';
import type { PostType, NoteType } from '@maiertech/sveltekit-helpers';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
	// Fetch posts.
	// TODO: `/api/posts/all` does not include `lastmodDate`.
	let response = await fetch('/api/posts/all');
	const posts = (await response.json()) as PostType[];

	// Create sitemap entries for posts.
	const postEntries = posts.map(
		(post) => `\t<url>
		<loc>${new URL(post.path, PUBLIC_URL_ORIGIN).href}</loc>
		<lastmod>${post.lastmodDate ? post.lastmodDate : post.publishedDate}</lastmod>
	</url>`
	);

	// Fetch notes.
	response = await fetch('/api/notes/all');
	const notes = (await response.json()) as NoteType[];

	// Create sitemap entries for notes.
	const noteEntries = notes.map(
		(note) => `\t<url>
		<loc>${new URL(note.path, PUBLIC_URL_ORIGIN).href}</loc>
		<lastmod>${note.publishedDate}</lastmod>
	</url>`
	);

	// Add additional entries to this array.
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
