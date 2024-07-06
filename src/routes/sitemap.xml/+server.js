import { PUBLIC_CANONICAL_ORIGIN } from '$env/static/public';
import { posts as allPosts } from '$lib/data';
import { gitHubCommitSchema } from '$lib/schemas';
import { get_latest_commit } from '$lib/utils/gh-api';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

export const prerender = true;

// Array returned from GitHub API can be empty.
const Schema = z.array(gitHubCommitSchema.optional());

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	// Lookup lastmod for each post.
	const postsWithLastmod = await Promise.all(
		allPosts.map(async (post) => {
			const response = await get_latest_commit(
				`apps/website/src/routes/(posts)${post.path}/+page.svelte`
			);

			if (!response.ok) {
				error(500, `Failed to fetch lastest commit for post ${post.path}.`);
			}

			const result = Schema.safeParse(await response.json());
			if (!result.success) {
				error(500, `Latest commit for post ${post.path} failed validation.`);
			}

			const [data] = result.data;
			const lastmod_date = data ? data.commit.author.date : undefined;

			return { ...post, lastmod_date };
		})
	);

	// Create sitemap entries for posts.
	const posts = postsWithLastmod.map(
		(post) => `\t<url>
		<loc>${new URL(post.path, PUBLIC_CANONICAL_ORIGIN).href}</loc>
		<lastmod>${post.lastmod_date ? post.lastmod_date : post.publishedDate}</lastmod>
	</url>`
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
