import { base } from '$app/paths';
import type { Link } from '$models/content.model';

const navigation: Link[] = [
	{ title: 'Posts', href: `${base}/posts` },
	{ title: 'Newsletter', href: `${base}/newsletter/subscribe` }
];

export default navigation;
