import type { Link } from '$lib/types/link.type';
import { base } from '$app/paths';

const navigation: Link[] = [{ title: 'Posts', href: `${base}/posts` }];

export default navigation;
