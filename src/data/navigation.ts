import type { Link } from '$models/content.model';
import { base } from '$app/paths';

const navigation: Link[] = [{ title: 'Posts', href: `${base}/posts` }];

export default navigation;
