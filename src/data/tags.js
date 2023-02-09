import { base } from '$app/paths';

/**
 * Valid tags, sorted by key.
 * @type {import('$lib/types').Tag[]}
 */
const tags = [
	{
		id: 'codesandbox',
		label: 'CodeSandbox',
		description: 'Posts tagged with CodeSandbox',
		path: `${base}/tags/codesandbox`
	},
	{
		id: 'css',
		label: 'CSS',
		description: 'Posts tagged with CSS.',
		path: `${base}/tags/css`
	},
	{
		id: 'd3',
		label: 'D3',
		description: 'Posts tagged with D3.',
		path: `${base}/tags/d3`
	},
	{
		id: 'github',
		label: 'GitHub',
		description: 'Posts tagged with GitHub.',
		path: `${base}/tags/github`
	},
	{
		id: 'gitpod',
		label: 'Gitpod',
		description: 'Posts tagged with Gitpod.',
		path: `${base}/tags/gitpod`
	},
	{
		id: 'node',
		label: 'Node',
		description: 'Posts tagged with Node.',
		path: `${base}/tags/node`
	},
	{
		id: 'screen-recording',
		label: 'Screen recording',
		description: 'Posts tagged with Screen recording.',
		path: `${base}/tags/screen-recording`
	},
	{
		id: 'sveltekit',
		label: 'SvelteKit',
		description: 'Posts tagged with SvelteKit.',
		path: `${base}/tags/sveltekit`
	},
	{
		id: 'seo',
		label: 'SEO',
		description: 'Posts tagged with SEO.',
		path: `${base}/tags/seo`
	},
	{
		id: 'stackblitz',
		label: 'StackBlitz',
		description: 'Posts labeled with StackBlitz.',
		path: `${base}/tags/stackblitz`
	},
	{
		id: 'twitter',
		label: 'Twitter',
		description: 'Posts labeled with Twitter.',
		path: `${base}/tags/twitter`
	},
	{
		id: 'vite',
		label: 'Vite',
		description: 'Posts tagged with Vite.',
		path: `${base}/tags/vite`
	},
	{
		id: 'vscode',
		label: 'VS Code',
		description: 'Posts tagged with VS Code.',
		path: `${base}/tags/vscode`
	}
];

export default tags;
