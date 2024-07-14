import { base } from '$app/paths';

/** @type {import('zod').z.infer<typeof import('$lib/schemas').linkSchema>[]} */
const navigation = [
	{ title: 'Home', href: `${base}/` },
	{ title: 'Posts', href: `${base}/posts` },
	{ title: 'Newsletter', href: `${base}/newsletter/subscribe` }
];

export default navigation;
