import { ORIGIN } from '$env/static/private';
import type { NoteMeta, ResolvedPost } from '@maiertech/sveltekit-helpers';
import type { RequestHandler } from './$types';

// export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
	// Fetch posts. `/api/posts/all` includes `lastmodDate`.
	const postsResponse = await fetch('/api/posts/all');
	const posts = (await postsResponse.json()) as ResolvedPost[];

	// Create sitemap entries for posts.
	const postEntries = posts.map(
		(post) => `\t<url>
		<loc>${ORIGIN}${post.path}</loc>
		<lastmod>${post.lastmodDate ? post.lastmodDate : post.publishedDate}</lastmod>
	</url>`
	);

	// Fetch notes.
	const notesResponse = await fetch('/api/notes/all');
	const notes = (await notesResponse.json()) as NoteMeta[];

	// Create sitemap entries for notes.
	const noteEntries = notes.map(
		(note) => `\t<url>
		<loc>${ORIGIN}${note.path}</loc>
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
