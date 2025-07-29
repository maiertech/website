import { VERCEL_URL } from '$env/static/private';
import type { NoteMeta, ResolvedPost } from '@maiertech/sveltekit-helpers';
import type { RequestHandler } from './$types';
import { getFullOrigin } from '$lib/utils';

export const prerender = true;

const fullOrigin = getFullOrigin(VERCEL_URL);

export const GET: RequestHandler = async ({ fetch }) => {
	// Fetch posts. `/api/posts/all` includes `lastmodDate`.
	let response = await fetch('/api/posts/all');
	const posts = (await response.json()) as ResolvedPost[];

	// Create sitemap entries for posts.
	const postEntries = posts.map(
		(post) => `\t<url>
		<loc>${fullOrigin}${post.path}</loc>
		<lastmod>${post.lastmodDate ? post.lastmodDate : post.publishedDate}</lastmod>
	</url>`
	);

	// Fetch notes.
	response = await fetch('/api/notes/all');
	const notes = (await response.json()) as NoteMeta[];

	// Create sitemap entries for notes.
	const noteEntries = notes.map(
		(note) => `\t<url>
		<loc>${fullOrigin}${note.path}</loc>
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
