import { base } from '$app/paths';

/**
 * Valid tags, sorted by id.
 * Access via endpoint /api/tags.
 *
 * @type {import('zod').z.infer<typeof import('$lib/schemas/content').TagsSchema>}
 */
const tags = [
	{
		id: 'codesandbox',
		label: 'CodeSandbox',
		path: `${base}/tags/codesandbox`
	},
	{
		id: 'css',
		label: 'CSS',
		path: `${base}/tags/css`
	},
	{
		id: 'd3',
		label: 'D3',
		path: `${base}/tags/d3`
	},
	{
		id: 'github',
		label: 'GitHub',
		path: `${base}/tags/github`
	},
	{
		id: 'gitpod',
		label: 'Gitpod',
		path: `${base}/tags/gitpod`
	},
	{
		id: 'node',
		label: 'Node',
		path: `${base}/tags/node`
	},
	{
		id: 'screen-recording',
		label: 'Screen recording',
		path: `${base}/tags/screen-recording`
	},
	{
		id: 'sveltekit',
		label: 'SvelteKit',
		path: `${base}/tags/sveltekit`
	},
	{
		id: 'seo',
		label: 'SEO',
		path: `${base}/tags/seo`
	},
	{
		id: 'stackblitz',
		label: 'StackBlitz',
		path: `${base}/tags/stackblitz`
	},
	{
		id: 'twitter',
		label: 'Twitter',
		path: `${base}/tags/twitter`
	},
	{
		id: 'vite',
		label: 'Vite',
		path: `${base}/tags/vite`
	},
	{
		id: 'vscode',
		label: 'VS Code',
		path: `${base}/tags/vscode`
	}
];

export default tags;
