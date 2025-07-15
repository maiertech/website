import type { PostMetaType } from '@maiertech/sveltekit-helpers';

const meta: PostMetaType = {
	title: 'Dropping requests in SvelteKit',
	author: 'thilo',
	publishedDate: '2025-07-01',
	description:
		"SvelteKit can't drop bad requests at the app layer, so I use Cloudflare's WAF to block bots before they hit my Railway-hosted site.",
	tags: ['svelte', 'railway'],
	path: '/posts/dropping-requests-in-sveltekit',
	filepath: 'src/routes/posts/(2025)/dropping-requests-in-sveltekit/+page.svx'
};

export default meta;
