import { PUBLIC_URL_ORIGIN } from '$env/static/public';
import type { PostType } from '@maiertech/sveltekit-helpers';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const response = await fetch('/api/posts');
	const posts = (await response.json()) as PostType[];

	// Create sitemap entries for posts.
	const postEntries = posts.map(
		(post) => `\t<url>
		<loc>${new URL(post.path, PUBLIC_URL_ORIGIN).href}</loc>
		<lastmod>${post.lastmodDate ? post.lastmodDate : post.publishedDate}</lastmod>
	</url>`
	);

	// Add additional entries to this array.
	const pages = [...postEntries];

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
