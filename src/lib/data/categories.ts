import type { Tag } from '$lib/types/tag.type';

import { base } from '$app/paths';

// Permitted categories, sorted by key.
const categories: Tag[] = [
  {
    key: 'developer-tools',
    label: 'Developer tools',
    title: 'Developer tools',
    description:
      'I write about developer tools, e.g. GitHub Codespaces and VS Code.',
    path: `${base}/developer-tools`,
  },
  {
    key: 'transitional-apps',
    label: 'Transitional apps',
    title: 'Transitional apps',
    description:
      'I write about creating transitional apps with SvelteKit and Svelte.',
    path: `${base}/transitional-apps`,
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
