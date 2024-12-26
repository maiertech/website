import { BLUESKY_PASSWORD, BLUESKY_DID } from '$env/static/private';
import { BskyAgent } from '@atproto/api';

const agent = new BskyAgent({
	service: 'https://bsky.social'
});

await agent.login({
	identifier: 'maier.tech',
	password: BLUESKY_PASSWORD
});

/** Get the latest 10 posts. */
export async function getPosts() {
	const { data } = await agent.getAuthorFeed({
		actor: BLUESKY_DID,
		filter: 'posts_no_replies',
		limit: 10
	});

	const { feed } = data;

	return feed;
}

/** Convert a Bluesky URI to a HTTP URL. */
export function convertToUrl(uri: string) {
	const [, , did, , rkey] = uri.split('/');
	return `https://bsky.app/profile/${did}/post/${rkey}`;
}
