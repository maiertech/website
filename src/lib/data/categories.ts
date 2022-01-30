import type { Tag } from '$lib/types/tag.type';

import { base } from '$app/paths';

// Permitted categories, sorted by relevance.
const categories: Tag[] = [
  {
    key: 'web-development',
    label: 'Web development',
    title: 'Web development',
    description:
      'I write about web development, mostly Svelte, SvelteKit and CSS.',
    path: `${base}/web-development`,
  },
  {
    key: 'developer-tools',
    label: 'Developer tools',
    title: 'Developer tools',
    description:
      'I write about developer tools, mostly developing with cloud workspaces',
    path: `${base}/developer-tools`,
  },
  {
    key: 'visualizing-data',
    label: 'Visualizing data',
    title: 'Visualizing data',
    description:
      'I write about exploring data with Observable and visualizing data with D3.',
    // path: '${base}/visualizing-data',
  },
  {
    key: 'legacy',
    label: 'Legacy',
    title: 'Legacy posts',
    description: 'Kitchen sink category for legacy posts.',
    // Omit path to suppress category page generation and linking.
  },
];

export default categories;
