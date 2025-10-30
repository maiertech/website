import { GITHUB_TOKEN, VIRALCARDS_API_KEY } from '$env/static/private'; // Needs to support prerendering.
import { all as allTags } from '$lib/server/collections/tags';
import { ogImageTemplate } from '$lib/templates';
import type {
	AvatarMeta,
	PostMeta,
	ResolvedPost,
	Tag,
	VcImageMeta
} from '@maiertech/sveltekit-helpers';
import { getAuthor, getLastCommit, getOgImageUrl, resolve } from '@maiertech/sveltekit-helpers';
import type { RequestEvent } from '@sveltejs/kit';

// Semaphore to limit concurrent API calls during prerendering
class Semaphore {
	private permits: number;
	private queue: Array<() => void> = [];

	constructor(permits: number) {
		this.permits = permits;
	}

	async acquire(): Promise<void> {
		if (this.permits > 0) {
			this.permits--;
			return Promise.resolve();
		}
		return new Promise((resolve) => {
			this.queue.push(resolve);
		});
	}

	release(): void {
		const resolve = this.queue.shift();
		if (resolve) {
			resolve();
		} else {
			this.permits++;
		}
	}

	async execute<T>(fn: () => Promise<T>): Promise<T> {
		await this.acquire();
		try {
			return await fn();
		} finally {
			this.release();
		}
	}
}

// Limit concurrent OG image and GitHub API calls to avoid overwhelming the APIs
const ogImageSemaphore = new Semaphore(3);
const githubSemaphore = new Semaphore(5);

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
				const tag = resolve<Tag>(id, allTags);
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
		// Limit concurrent OG image API calls
		ogImageUrl = await ogImageSemaphore.execute(() =>
			getOgImageUrl({ meta: ogImageMeta, apiKey: VIRALCARDS_API_KEY })
		);
	}

	// Resolve lastmodDate.
	let lastmodDate: string | undefined = undefined;
	// Limit concurrent GitHub API calls
	const lastCommit = await githubSemaphore.execute(() =>
		getLastCommit({
			owner: 'maiertech',
			repo: 'website',
			path: postMeta.filepath,
			token: GITHUB_TOKEN
		})
	);

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
