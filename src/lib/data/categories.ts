import type { Tag } from '$lib/types/tag.type';

import { base } from '$app/paths';

// Permitted categories, sorted by key.
const categories: Tag[] = [
  {
    key: 'creating',
    label: 'Creating',
    title: 'Creating web applications',
    path: `${base}/creating`,
  },
  {
    key: 'visualizations',
    label: 'Visualizing data',
    title: 'Visualizing data in web applications',
    path: '${base}/visualizations',
  },
  {
    key: 'privacy',
    label: 'Privacy',
    title: 'DeApple and deGoogle your gadgets',
    path: '${base}/privacy',
  },
];

export default categories;
