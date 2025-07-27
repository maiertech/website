import type { PostMeta } from '@maiertech/sveltekit-helpers';
import ogImageUrl from './og-image.png';
import { PUBLIC_URL_ORIGIN } from '$env/static/public';

export default {
	title: 'How to provide better context in GitHub Copilot prompts',
	author: 'thilo',
	publishedDate: '2024-11-15',
	description:
		'Learn to provide better context in GitHub Copilot prompts using inline chat, context shortcuts, chat participants, and project instructions for improved AI suggestions.',
	tags: ['dx', 'ai', 'vscode'],
	path: '/posts/github-copilot-context',
	ogImageUrl: `${PUBLIC_URL_ORIGIN}${ogImageUrl}`,
	filepath: 'src/routes/posts/(2024)/github-copilot-context/+page.svx'
} satisfies PostMeta;
