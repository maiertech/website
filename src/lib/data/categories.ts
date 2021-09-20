import type { Tag } from '$lib/types/tag.type';

// Permitted categories, sorted by key.
const categories: Tag[] = [
  {
    key: 'creating',
    label: 'Creating',
    title: 'Creating with Svelte and SvelteKit',
    path: '/categories/creating',
  },
  {
    key: 'dataviz',
    label: 'Data visualization',
    title: 'Visualizing data with Observable and D3',
    path: '/categories/dataviz',
  },
  {
    key: 'privacy',
    label: 'Privacy',
    title: 'DeApple and deGoogle your life',
    path: '/categories/privacy',
  },
];

export default categories;
