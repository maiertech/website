import type { Tag } from '$lib/types/tag.type';

// Permitted tags, sorted by key.
const tags: Tag[] = [
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
  {
    key: 'vscode',
    label: 'VSCode',
    title: 'Posts about Visual Studio Code',
    path: '/tags/vscode',
  },
];

export default tags;
