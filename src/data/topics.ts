import { base } from '$app/paths';

import type { Topic } from '$models/content.model';

// Permitted topics, sorted by relevance.
const topics: Topic[] = [
	{
		id: 'svelte',
		label: 'SV',
		title: 'Svelte',
		description:
			'I build web apps with Svelte, the framework that puts the fun back into web development.',
		path: `${base}/svelte`
	},
	{
		id: 'data-visualization',
		label: 'DV',
		title: 'Data visualization',
		description:
			'I create data visualizations with Svelte and D3 to go from data to insights faster.',
		path: `${base}/data-visualization`
	},
	{
		id: 'dx',
		label: 'DX',
		title: 'Developer happiness',
		description: 'I write about services and tools that improve my personal DX.',
		path: `${base}/dx`
	},
	{
		id: 'web-fundamentals',
		label: 'WF',
		title: 'Web fundamentals',
		description: "Web APIs are Svelte's foundation. Brush up on the fundamentals they say.",
		path: `${base}/web-fundamentals`
	},
	{
		id: 'content-creation',
		label: 'CC',
		title: 'Content creation',
		description:
			'I share what I learn about content creation. Writing posts, crafting tweets and recording screencasts.',
		path: `${base}/content-creation`
	}
];

export default topics;
