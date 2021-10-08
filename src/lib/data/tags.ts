import type { Tag } from '$lib/types/tag.type';

import { base } from '$app/paths';

// Permitted tags, sorted by key.
const tags: Tag[] = [
  {
    key: 'seo',
    label: 'SEO',
    title: 'Posts about SEO',
    path: `${base}/tags/seo`,
  },
  {
    key: 'svelte',
    label: 'Svelte',
    title: 'Posts about Svelte',
    path: `${base}/tags/svelte`,
  },
  {
    key: 'tooling',
    label: 'Tooling',
    title: 'Posts about developer tooling',
    path: `${base}/tags/tooling`,
  },
  {
    key: 'vscode',
    label: 'VSCode',
    title: 'Posts about Visual Studio Code',
    path: `${base}/tags/vscode`,
  },
];

export default tags;
