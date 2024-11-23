import { getAuthors } from './authors';
import { getTags } from './tags';
import type { Author, Post, PostFrontmatter, Tag } from '@maiertech/sveltekit-helpers';
import { postFrontmatterSchema, resolve } from '@maiertech/sveltekit-helpers';
import { error } from '@sveltejs/kit';
import { getLatestCommit } from '../github-api';

// Conscious choice: `posts` is shared backend state.
let posts: Post[];

// TODO Remove one by one after converting to Markdoc.
const legacyMetadata = [
	{
		title: 'Five ways to customize a Gitpod workspace',
		author: 'thilo',
		publishedDate: '2023-03-23T00:00:00.00Z',
		description:
			'Gitpod offers unique ways to customize a workspace, which sets it apart from its competitors. This post will show five ways to customize a Gitpod workspace and how they result in one of the best cloud workspace offerings.',
		tags: ['dx', 'gitpod'],
		path: '/posts/five-ways-to-customize-a-gitpod-workspace',
		id: '/posts/five-ways-to-customize-a-gitpod-workspace'
	},
	{
		title: 'Configuring Turborepo for a SvelteKit monorepo',
		author: 'thilo',
		publishedDate: '2023-03-16T00:00:00.00Z',
		description:
			'This post provides an overview of configuring a Turborepo for a monorepo with SvelteKit apps and dependencies. It also looks at potential pitfalls when you configure your first Turborepo.',
		tags: ['svelte', 'turborepo'],
		path: '/posts/configuring-turborepo-for-a-sveltekit-monorepo',
		id: '/posts/configuring-turborepo-for-a-sveltekit-monorepo'
	},
	{
		title: 'Complement zero-effort type safety in SvelteKit with Zod for even more type safety',
		author: 'thilo',
		publishedDate: '2023-03-10T00:00:00.00Z',
		description:
			'Zero-effort type safety in SvelteKit gives you type safety for data that flows through your app. This post shows you how to complement zero-effort type safety with Zod schemas to validate and type incoming data in a SvelteKit app.',
		tags: ['svelte', 'typescript'],
		path: '/posts/complement-zero-effort-type-safety-in-sveltekit-with-zod-for-even-more-type-safety',
		id: '/posts/complement-zero-effort-type-safety-in-sveltekit-with-zod-for-even-more-type-safety'
	},
	{
		title: 'Do I need a sitemap for my SvelteKit app, and how do I create it?',
		author: 'thilo',
		publishedDate: '2023-03-01T00:00:00.00Z',
		description:
			'In this post, I provide an overview of when you need a sitemap, what format it should have, and explain how to create an endpoint for a sitemap in SveltKit.',
		tags: ['svelte', 'seo', 'web-fundamentals'],
		path: '/posts/do-i-need-a-sitemap-for-my-sveltekit-app-and-how-do-i-create-it',
		id: '/posts/do-i-need-a-sitemap-for-my-sveltekit-app-and-how-do-i-create-it'
	},
	{
		title: 'Cookie settings for StackBlitz WebContainers',
		author: 'thilo',
		publishedDate: '2023-02-10T00:00:00.00Z',
		description:
			'Your browser needs to have third-party cookies enabled when you look at live-code examples embedded with StackBlitz WebContainers. Alternatively, you can allow specific URL patterns to always use cookies. This post describes how embedded WebContainers work in your browser without allowing third-party cookies for all sites.',
		tags: ['dx', 'stackblitz'],
		path: '/posts/cookie-settings-for-stackblitz-webcontainers',
		id: '/posts/cookie-settings-for-stackblitz-webcontainers'
	},
	{
		title: 'Is StackBlitz Codeflow Beta ready to replace your local VS Code?',
		author: 'thilo',
		publishedDate: '2023-02-02T00:00:00.00Z',
		description:
			'StackBlitz Codeflow Beta is a VS Code alternative that runs natively in modern browsers. It is under development and comes with limitations and drawbacks. In this post, I evaluate if Codeflow is ready to be used as a primary development environment.',
		tags: ['dx', 'stackblitz'],
		path: '/posts/is-stackblitz-codeflow-beta-ready-to-replace-your-local-vs-code',
		id: '/posts/is-stackblitz-codeflow-beta-ready-to-replace-your-local-vs-code'
	},
	{
		title: 'Handling breaking changes in SvelteKit pre-1.0',
		author: 'thilo',
		publishedDate: '2022-09-01T00:00:00.00Z',
		description:
			'In the last month or so, there have been many breaking changes in SvelteKit. While this is expected pre-1.0, it poses a challenge to anyone running a SvelteKit app in production. In this post, I provide guidance on working through the recent breaking changes.',
		tags: ['svelte'],
		path: '/posts/handling-breaking-changes-in-sveltekit-pre-1-0',
		id: '/posts/handling-breaking-changes-in-sveltekit-pre-1-0'
	},
	{
		title: 'Using the @ and # symbols in tweets with a word joiner character',
		author: 'thilo',
		publishedDate: '2022-08-30T00:00:00.00Z',
		description:
			'Twitter interprets strings starting with @ and # as mention and hashtag. It misinterprets Svelte-related strings, e.g., @const and #if. In this post, you will learn how to fix this.',
		tags: ['content-creation'],
		path: '/posts/using-the-at-and-hash-symbols-in-tweets-with-a-word-joiner-character',
		id: '/posts/using-the-at-and-hash-symbols-in-tweets-with-a-word-joiner-character'
	},
	{
		title: 'Three ways to bootstrap a Svelte project',
		author: 'thilo',
		publishedDate: '2022-07-01T00:00:00.00Z',
		description:
			'This post discusses three ways to bootstrap a Svelte project. Learn why using the official Vite Svelte templates results in the best developer experience.',
		tags: ['svelte', 'codesandbox'],
		path: '/posts/three-ways-to-bootstrap-a-svelte-project',
		id: '/posts/three-ways-to-bootstrap-a-svelte-project'
	},
	{
		title: 'Exploring frequently used methods of d3-array',
		author: 'thilo',
		publishedDate: '2022-06-27T00:00:00.00Z',
		description:
			'Working with JavaScript arrays is a crucial skill for data visualization with D3. Explore frequently used methods of d3-array in this post.',
		tags: ['data-visualization', 'd3'],
		path: '/posts/exploring-frequently-used-methods-of-d3-array',
		id: '/posts/exploring-frequently-used-methods-of-d3-array'
	},
	{
		title: 'Groking :active, :focus and :focus-visible pseudo-classes',
		author: 'thilo',
		publishedDate: '2022-06-20T00:00:00.00Z',
		description:
			'This post explains the subtle differences between CSS pseudo-classes :active, :focus and :focus-visible.',
		tags: ['css', 'web-fundamentals'],
		path: '/posts/groking-active-focus-and-focus-visible-pseudo-classes',
		id: '/posts/groking-active-focus-and-focus-visible-pseudo-classes'
	},
	{
		title: 'Recording screencasts on a HiDPI display',
		author: 'thilo',
		publishedDate: '2022-06-05T00:00:00.00Z',
		description:
			'This post explains the difference between scaled resolution and actual resolution and why it matters when recording a screencast on a HiDPI display.',
		tags: ['content-creation'],
		path: '/posts/recording-screencasts-on-a-hidpi-display',
		id: '/posts/recording-screencasts-on-a-hidpi-display'
	},
	{
		title: 'Route matching in SvelteKit',
		author: 'thilo',
		publishedDate: '2022-02-13T00:00:00.00Z',
		description:
			"This post explores how SvelteKit's filesystem-based router matches a requested route to a page or an endpoint in src/routes.",
		tags: ['svelte'],
		path: '/posts/route-matching-in-sveltekit',
		id: '/posts/route-matching-in-sveltekit'
	},
	{
		title: 'How to make SvelteKit HMR work with Gitpod',
		author: 'thilo',
		publishedDate: '2022-01-30T00:00:00.00Z',
		description:
			'SvelteKit HMR breaks when developing with a Gitpod workspace in a browser. This post explains how to fix this.',
		tags: ['gitpod', 'svelte', 'dx'],
		path: '/posts/how-to-make-sveltekit-hmr-work-with-gitpod',
		id: '/posts/how-to-make-sveltekit-hmr-work-with-gitpod'
	},
	{
		title: 'A better development workflow with disposable workspaces',
		author: 'thilo',
		publishedDate: '2021-12-12T00:00:00.00Z',
		description:
			'Disposable workspaces with Gitpod and GitHub Codespaces enable a new development workflow that eliminates the friction of local development.',
		tags: ['gitpod', 'github', 'dx'],
		path: '/posts/a-better-development-workflow-with-disposable-workspaces',
		id: '/posts/a-better-development-workflow-with-disposable-workspaces'
	},
	{
		title: 'How to use GitHub CLI to configure SSH authentication to GitHub',
		author: 'thilo',
		publishedDate: '2021-10-20T00:00:00.00Z',
		description:
			'Setting up SSH authentication to GitHub used to be a tedious multi-step process. Now it is a breeze if you let GitHub CLI do the hard work for you.',
		tags: ['dx', 'github'],
		path: '/posts/how-to-use-github-cli-to-configure-ssh-authentication-to-github',
		id: '/posts/how-to-use-github-cli-to-configure-ssh-authentication-to-github'
	},
	{
		title: 'How to wire up Fathom Analytics in a SvelteKit app',
		author: 'thilo',
		publishedDate: '2021-10-15T00:00:00.00Z',
		description:
			'In this post, you will learn how to set up Fathom Analytics in a SvelteKit app to track pageviews and goals while ensuring privacy for your visitors.',
		tags: ['svelte', 'seo'],
		path: '/posts/how-to-wire-up-fathom-analytics-in-a-sveltekit-app',
		id: '/posts/how-to-wire-up-fathom-analytics-in-a-sveltekit-app'
	},
	{
		title: 'Move your IDE to the cloud: introduction to GitHub Codespaces',
		author: 'thilo',
		publishedDate: '2021-01-03T00:00:00.00Z',
		description:
			'In this introduction to GitHub Codespaces you will learn how to run VS Code in the cloud and how to spin up a zero-configuration development environment.',
		tags: ['github', 'dx'],
		path: '/posts/move-your-ide-to-the-cloud-introduction-to-github-codespaces',
		id: '/posts/move-your-ide-to-the-cloud-introduction-to-github-codespaces'
	}
];

// Initialize `posts` synchronously with module level `await`.
await initialize();

async function initialize() {
	// Escape `(` and `)`. Otherwise they define a capture group that matches `posts` instead of `(posts)`.
	const globs = import.meta.glob('/src/routes/\\(posts\\)/posts/**/*.markdoc', {
		eager: true
	});

	const frontmatters = Object.entries(globs).map(([filepath, post]) => {
		const { frontmatter } = post as { frontmatter: PostFrontmatter };

		// Validate.
		const result = postFrontmatterSchema.safeParse(frontmatter);
		if (!result.success) {
			error(500, `Invalid frontmatter in ${filepath}: ${result.error.message}`);
		}

		const path = filepath.replace('/src/routes/(posts)', '').replace('/+page.markdoc', '');

		return {
			...frontmatter,
			id: path,
			path
		};
	});

	const metadata = [...legacyMetadata, ...frontmatters];

	const resolvedPosts = await Promise.all(
		metadata.map(async (post) => {
			// Resolve author and tags.
			const author = post.author ? resolve<Author>(post.author, getAuthors()) : undefined;
			const tags = post.tags
				? post.tags.map((tag) => resolve<Tag>(tag, getTags())).filter((tag) => tag !== undefined) // Drop tag if it cannot be resolved.
				: undefined;
			// Add `lastmodDate` (for Markdoc posts only).
			const filepath = `src/routes/(posts)${post.path}/+page.markdoc`;
			const latestCommit = await getLatestCommit(filepath);
			return { ...post, author, tags, lastmodDate: latestCommit?.commit.author?.date };
		})
	);

	// Init global variable.
	posts = resolvedPosts.sort(
		(a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
	);
}

export function getPosts(): Post[] {
	return posts;
}
