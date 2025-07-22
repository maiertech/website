import type { PostMeta, ResolvedPost } from '@maiertech/sveltekit-helpers';
import {
	createAuthorTransformer,
	createPipeline,
	createTagsTransformer
} from '@maiertech/sveltekit-helpers';
import type { RequestEvent } from '@sveltejs/kit';

export default async function (postMeta: PostMeta, event: RequestEvent): Promise<ResolvedPost> {
	const transform = createPipeline<PostMeta, ResolvedPost>([
		createAuthorTransformer(event),
		createTagsTransformer(event)
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
