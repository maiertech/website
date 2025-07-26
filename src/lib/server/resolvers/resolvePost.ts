import { GITHUB_TOKEN, VIRALCARDS_API_KEY } from '$env/static/private'; // Needs to support prerendering.
import { ogImageTemplate } from '$lib/templates';
import type {
	AvatarMeta,
	PostMeta,
	ResolvedPost,
	Tag,
	VcImageMeta
} from '@maiertech/sveltekit-helpers';
import { getAuthor, getLastCommit, getOgImageUrl, getTag } from '@maiertech/sveltekit-helpers';
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
		...postMeta,
		author,
		tags: tags.length > 0 ? tags : undefined,
		ogImageUrl,
		lastmodDate
	};

	return resolvedPost;
}
