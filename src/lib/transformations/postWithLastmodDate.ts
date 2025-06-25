import type { PostMetaType, PostType } from '@maiertech/sveltekit-helpers';
import {
	createAuthorTransformer,
	createPipeline,
	createTagsTransformer,
	createFilepathTransformer
} from '@maiertech/sveltekit-helpers';
import type { RequestEvent } from '@sveltejs/kit';

export default async function (postMeta: PostMetaType, event: RequestEvent): Promise<PostType> {
	const transform = createPipeline<PostMetaType, PostType>([
		createAuthorTransformer(event),
		createTagsTransformer(event),
		createFilepathTransformer('maiertech', 'sveltekit-helpers')
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
