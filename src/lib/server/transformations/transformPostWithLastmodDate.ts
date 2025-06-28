// This runs on the server only.
// Secret is bundled into the server bundle.
// Not great, but the only way to make prerendering work for posts.
import { GITHUB_TOKEN } from '$env/static/private';
import type { PostMetaType, PostType } from '@maiertech/sveltekit-helpers';
import {
	createAuthorTransformer,
	createFilepathTransformer,
	createPipeline,
	createTagsTransformer
} from '@maiertech/sveltekit-helpers';
import type { RequestEvent } from '@sveltejs/kit';

export default async function (postMeta: PostMetaType, event: RequestEvent): Promise<PostType> {
	const transform = createPipeline<PostMetaType, PostType>([
		createAuthorTransformer(event),
		createTagsTransformer(event),
		createFilepathTransformer({
			owner: 'maiertech',
			repo: 'sveltekit-helpers',
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
