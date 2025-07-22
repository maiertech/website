// This runs on the server only.
// Secret is bundled into the server bundle.
// Not great, but the only way to make prerendering work for posts.
import { GITHUB_TOKEN } from '$env/static/private';
import type { PostMeta, ResolvedPost } from '@maiertech/sveltekit-helpers';
import {
	createAuthorTransformer,
	createFilepathTransformer,
	createPipeline,
	createTagsTransformer
} from '@maiertech/sveltekit-helpers';
import type { RequestEvent } from '@sveltejs/kit';

export default async function (postMeta: PostMeta, event: RequestEvent): Promise<ResolvedPost> {
	const transform = createPipeline<PostMeta, ResolvedPost>([
		createAuthorTransformer(event),
		createTagsTransformer(event),
		createFilepathTransformer({
			owner: 'maiertech',
			repo: 'website',
			token: GITHUB_TOKEN
		})
	]);
	const post = await transform(postMeta, {
		title: postMeta.title,
		description: postMeta.description,
		publishedDate: postMeta.publishedDate,
		path: postMeta.path,
		ogImageUrl: postMeta.ogImageUrl,
		prev: postMeta.prev,
		next: postMeta.next
	});
	return post;
}
