import type { RequestHandler } from '@sveltejs/kit';
import { PUBLIC_URL_ORIGIN } from '$env/static/public';
import type { NoteMeta } from '@maiertech/sveltekit-helpers';

export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch('/api/notes/latest');
	const notes = (await response.json()) as NoteMeta[];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>Thilo Maier (notes)</title>
    <description>RSS feed for Thilo Maier's notes.</description>
    <link>${PUBLIC_URL_ORIGIN}</link>
    <language>en-US</language>
    <generator>${PUBLIC_URL_ORIGIN}</generator>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${PUBLIC_URL_ORIGIN}/notes/rss.xml" rel="self" type="application/rss+xml" />
    ${notes
			.map(
				(note) => `
      <item>
        <title>${note.title}</title>
        <description>${note.description}</description>
        <link>${PUBLIC_URL_ORIGIN}${note.path}</link>
        <pubDate>${new Date(note.publishedDate).toUTCString()}</pubDate>
        <guid>${PUBLIC_URL_ORIGIN}${note.path}</guid>
      </item>
    `
			)
			.join('')}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
