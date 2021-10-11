import type { Tag } from '$lib/types/tag.type';

import { base } from '$app/paths';

// Valid tags, sorted by key.
// Omitting path results in tag page not being generated.
const tags: Tag[] = [
  {
    key: 'nextjs',
    label: 'Next.js',
    title: 'Creating web apps with Next.js',
    description:
      'If you develop web apps in the React ecosystem, you should go with Next.js.',
    path: `${base}/tags/nextjs`,
  },
  {
    key: 'sveltekit',
    label: 'SvelteKit',
    title: 'Creating web apps with SvelteKit',
    description:
      'SvelteKit is my favorite framework to create fast and scalable websites. I write about issues I ran into and how I solved them.',
    path: `${base}/tags/sveltekit`,
  },
  {
    key: 'seo',
    label: 'SEO',
    title: 'Growing your audience with SEO',
    description:
      'Building an audience from scratch is hard. Growing traffic with SEO provides an opportunity to convert organic traffic into an audience.',
    path: `${base}/tags/seo`,
  },
  {
    key: 'vscode',
    label: 'VS Code',
    title: 'VS Code productivity hacks',
    description:
      'I write about how I boost my productivity with Visual Studio Code.',
    path: `${base}/tags/vscode`,
  },
];

export default tags;
