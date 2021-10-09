import type { Tag } from '$lib/types/tag.type';

import { base } from '$app/paths';

// Permitted categories, sorted by key.
const categories: Tag[] = [
  {
    key: 'creating',
    label: 'Creating',
    title: 'Creating web apps',
    description: 'I write about creating web apps with SvelteKit and Svelte.',
    path: `${base}/creating`,
  },
  // {
  //   key: 'visualizations',
  //   label: 'Visualizing data',
  //   title: 'Visualizing data',
  //   description:
  //     'I write about exploring data with Observable and visualizing data with D3.',
  //   path: '${base}/visualizations',
  // },
  // {
  //   key: 'privacy',
  //   label: 'Privacy',
  //   title: 'Reclaiming privacy',
  //   description: 'I write about how I reclaim my digital privacy.',
  //   path: '${base}/privacy',
  // },
];

export default categories;
