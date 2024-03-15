/**
 * Permitted topics, sorted by relevance.
 * Access via endpoint /api/topics.
 * @type {import('$lib/types').Topic[]}
 */
export default [
	{
		id: 'svelte',
		label: 'Svelte',
		description:
			'I build web apps with Svelte, the framework that puts the fun back into web development.',
		path: '/svelte'
	},
	{
		id: 'data-visualization',
		label: 'Data visualization',
		description:
			'I create data visualizations with Svelte and D3 to go from data to insights faster.',
		path: '/data-visualization'
	},
	{
		id: 'dx',
		label: 'Developer happiness',
		description: 'I write about services and tools that improve my developer happiness.',
		path: '/dx'
	},
	{
		id: 'web-fundamentals',
		label: 'Web fundamentals',
		description: "Web APIs are Svelte's foundation. Brush up on the fundamentals, they say.",
		path: '/web-fundamentals'
	},
	{
		id: 'content-creation',
		label: 'Content creation',
		description:
			'I share what I learn about content creation. Writing posts, crafting posts on Mastodon, and recording screencasts.',
		path: '/content-creation'
	}
];
