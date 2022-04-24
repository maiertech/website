import type { Tag } from '$lib/types/tag.type';

import { base } from '$app/paths';

// Permitted categories, sorted by relevance.
const categories: Tag[] = [
  {
    key: 'web-development',
    label: 'Web development',
    title: 'Web development',
    description:
      'I write about web development, mostly SvelteKit, Svelte and fundamentals.',
    path: `${base}/web-development`,
  },
  {
    key: 'data-viz',
    label: 'Data visualization',
    title: 'Data visualization',
    description: 'I write about data visualization with Svelte and D3.',
    path: `${base}/data-viz`,
    suppress: true,
  },
  {
    key: 'developer-tools',
    label: 'Developer tools',
    title: 'Developer tools',
    description: 'I write about developer tools that make me more productive.',
    path: `${base}/developer-tools`,
  },
  {
    key: 'legacy',
    label: 'Legacy',
    title: 'Legacy posts',
    description: 'Kitchen sink category for legacy posts.',
    path: `${base}/legacy`,
    suppress: true,
  },
];

export default categories;
