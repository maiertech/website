import { base } from '$app/paths';

/** @type {import('$lib/types').Link[]} */
const navigation = [
	{ title: 'Posts', href: `${base}/posts` },
	{ title: 'Newsletter', href: `${base}/newsletter/subscribe` }
];

export default navigation;
