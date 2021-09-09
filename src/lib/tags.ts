import type { Tag } from './types/tag.type';

// Permitted tags, sorted by key.
const tags: Tag[] = [
  {
    key: 'gatsby',
    label: 'Gatsby',
    title: 'Posts about Gatsby',
    path: '/tags/gatsby',
  },
  {
    key: 'nextjs',
    label: 'Next.js',
    title: 'Posts about Next.js',
    path: '/tags/nextjs',
  },
  {
    key: 'nodejs',
    label: 'Node.js',
    title: 'Posts about Node.js',
    path: '/tags/nodejs',
  },
  {
    key: 'svelte',
    label: 'Svelte',
    title: 'Posts about Svelte',
    path: '/tags/svelte',
  },
  {
    key: 'tooling',
    label: 'Tooling',
    title: 'Posts about developer tooling',
    path: '/tags/tooling',
  },
];

export default tags;
