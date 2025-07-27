import type { PostMeta } from '@maiertech/sveltekit-helpers';

export default {
	title: 'Dropping requests in SvelteKit',
	author: 'thilo',
	publishedDate: '2025-07-27',
	description:
		"SvelteKit can't truly drop bad requests, so I use Cloudflare's WAF to block bots before they reach my Railway-hosted app.",
	tags: ['svelte', 'railway'],
	path: '/posts/dropping-requests-in-sveltekit',
	filepath: 'src/routes/posts/(2025)/dropping-requests-in-sveltekit/+page.svx'
} satisfies PostMeta;
