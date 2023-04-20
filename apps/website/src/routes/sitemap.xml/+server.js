import { ORIGIN } from '$env/static/private';
import all_posts from '$lib/data/posts';
import { GHCommitSchema } from '$lib/schemas/index.js';
import { get_latest_commit } from '$lib/utils/gh-api';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

export const prerender = true;

// Array returned from GitHub API can be empty.
const Schema = z.array(GHCommitSchema.optional());

/**
 * Create page string for sitemap.
 * @param {string} path
 * @param {string} [lastmod]
 */
function create_entry(path, lastmod) {
	return `\t<url>
		<loc>${new URL(path, ORIGIN).href}</loc>
		${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
	</url>`;
}

export async function GET() {
	// Lookup lastmod for each post.
	const posts_with_lastmod = await Promise.all(
		all_posts.map(async (post) => {
			const response = await get_latest_commit(
				`apps/website/src/routes/(posts)${post.path}/+page.svelte`
			);

			if (!response.ok) {
				throw error(500, `Failed to fetch lastest commit for post ${post.path}.`);
			}

			const result = Schema.safeParse(await response.json());
			if (!result.success) {
				throw error(500, `Latest commit for post ${post.path} failed validation.`);
			}

			const [data] = result.data;
			const lastmod = data ? data.commit.author.date : undefined;

			return { ...post, lastmod };
		})
	);

	// Create sitemap entries for posts.
	const posts = posts_with_lastmod.map((post) =>
		create_entry(post.path, post.lastmod ? post.lastmod : post.published)
	);

	// Add additional entries to this array.
	const pages = [...posts];

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
}
