import type { Link } from '$lib/types/link.type';
import { base } from '$app/paths';

const navigation: Link[] = [
  { title: 'Posts', href: `${base}/posts` },
  { title: 'Svelte examples', href: `${base}/svelte/examples` },
];

export default navigation;
