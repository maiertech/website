import { base } from '$app/paths';

import type { Topic } from '$models/content.model';

// Permitted topics, sorted by relevance.
const topics: Topic[] = [
  {
    id: 'svelte',
    label: 'SV',
    title: 'Svelte',
    description:
      'I write about the framework that disappears in production and puts the fun back into web development.',
    path: `${base}/svelte`,
  },
  {
    id: 'data-visualization',
    label: 'DV',
    title: 'Data visualization',
    description:
      'I write about how D3 and Svelte complement each other and help me go from data to insights much faster.',
    path: `${base}/data-visualization`,
  },
  {
    id: 'web-fundamentals',
    label: 'WF',
    title: 'Web fundamentals',
    description:
      'I write about CSS and other Web APIs that come in handy when developing with Svelte.',
    path: `${base}/web-fundamentals`,
  },
  {
    id: 'dx',
    label: 'DX',
    title: 'Personal DX',
    description: 'I write about services and tools I use to improve my own DX.',
    path: `${base}/dx`,
  },
  {
    id: 'content-creation',
    label: 'CC',
    title: 'Content creation',
    description:
      'I write about how I write posts, craft tweets and record screencasts.',
    path: `${base}/content-creation`,
  },
];

export default topics;
