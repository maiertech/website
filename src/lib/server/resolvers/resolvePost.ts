import { VIRALCARDS_API_KEY, GITHUB_TOKEN } from '$env/static/private'; // Needs to support prerendering.
import { ogImageTemplate } from '$lib/templates';
import type {
	AvatarMeta,
	PostMeta,
	ResolvedPost,
	Tag,
	VcImageMeta
} from '@maiertech/sveltekit-helpers';
import { getAuthor, getOgImageUrl, getTag, getLastCommit } from '@maiertech/sveltekit-helpers';
import type { RequestEvent } from '@sveltejs/kit';

export default async function ({
	postMeta,
	event
}: {
	postMeta: PostMeta;
	event: RequestEvent;
}): Promise<ResolvedPost> {
	// Resolve author.
	let author: AvatarMeta | undefined = undefined;
	if (postMeta.author) {
		author = await getAuthor(postMeta.author, event);
	}

	// Resolve tags.
	const tags: Tag[] = [];
	if (postMeta.tags && postMeta.tags.length > 0) {
		// Fetch all tags asynchronously.
		await Promise.all(
			postMeta.tags.map(async (id) => {
				const tag = await getTag(id, event);
				if (tag) {
					tags.push(tag);
				}
			})
		);
	}

	// Resolve ogImageUrl.
	// `ogImageUrl` from `postMeta` takes precedence.
	let ogImageUrl: string | undefined = postMeta.ogImageUrl;

	if (!ogImageUrl) {
		const ogImageMeta = {
			...ogImageTemplate,
			template: 'maiertechPost',
			title: postMeta.title
		} as VcImageMeta;
		ogImageUrl = await getOgImageUrl({ meta: ogImageMeta, apiKey: VIRALCARDS_API_KEY });
	}

	// Resolve lastmodDate.
	let lastmodDate: string | undefined = undefined;
	const lastCommit = await getLastCommit({
		owner: 'maiertech',
		repo: 'website',
		path: postMeta.filepath,
		token: GITHUB_TOKEN
	});

	if (lastCommit) {
		lastmodDate = lastCommit.commit.author?.date;
	}

	const resolvedPost: ResolvedPost = {
		title: postMeta.title,
		description: postMeta.description,
		publishedDate: postMeta.publishedDate,
		path: postMeta.path,
		author,
		tags: tags.length > 0 ? tags : undefined,
		ogImageUrl,
		lastmodDate,
		prev: postMeta.prev,
		next: postMeta.next
	};

	return resolvedPost;
}
