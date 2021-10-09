import type { Tag } from '$lib/types/tag.type';

import { base } from '$app/paths';

// Permitted tags, sorted by key.
const tags: Tag[] = [
  {
    key: 'svelte',
    label: 'SvelteKit and Svelte',
    title: 'Creating web apps with SvelteKit and Svelte',
    description:
      'SvelteKit is my favorite framework to create fast and scalable websites. I write about issues I ran into and how I solved them.',
    path: `${base}/tags/svelte`,
  },
  {
    key: 'tooling',
    label: 'Developer tooling',
    title: 'Boosting productivity with developer tooling',
    description:
      'I write about what developer tooling I use to boost my productivity.',
    path: `${base}/tags/tooling`,
  },
];

export default tags;
