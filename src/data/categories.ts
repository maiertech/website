import type { Tag } from '$models/content.model';

import { base } from '$app/paths';

// Permitted categories, sorted by relevance.
const categories: Tag[] = [
  {
    id: 'web-development',
    label: 'Web development',
    title: 'Web development',
    description:
      'I write about web development, mostly SvelteKit, Svelte and fundamentals.',
    path: `${base}/web-development`,
  },
  {
    id: 'data-viz',
    label: 'Data visualization',
    title: 'Data visualization',
    description: 'I write about data visualization with Svelte and D3.',
    path: `${base}/data-viz`,
    suppress: true,
  },
  {
    id: 'developer-tools',
    label: 'Developer tools',
    title: 'Developer tools',
    description: 'I write about developer tools that make me more productive.',
    path: `${base}/developer-tools`,
  },
  {
    id: 'content-creation',
    label: 'Content creation',
    title: 'Content creation',
    description:
      'I write about crafting tweets, writing posts and producing screencasts.',
    path: `${base}/content-creation`,
  },
  {
    id: 'legacy',
    label: 'Legacy',
    title: 'Legacy posts',
    description: 'Kitchen sink category for legacy posts.',
    path: `${base}/legacy`,
    suppress: true,
  },
];

export default categories;
