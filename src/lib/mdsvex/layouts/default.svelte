<script lang="ts" module>
	// Custom components for Markdown rendering
	import {
		Blockquote as blockquote,
		Code as code,
		H1 as h1,
		H2 as h2,
		H3 as h3,
		H4 as h4,
		H5 as h5,
		H6 as h6,
		Ol as ol,
		Pre as pre,
		Table as table,
		Ul as ul
	} from '@maiertech/sveltekit-helpers';

	// eslint-disable-next-line no-import-assign
	export { blockquote, code, h1, h2, h3, h4, h5, h6, ol, pre, table, ul };
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="markdown-content">
	{@render children()}
</div>

<style>
	.markdown-content > :global(*) {
		margin-block-end: var(--spacing-4, 1rem);
	}

	.markdown-content > :global(h1),
	.markdown-content > :global(h2),
	.markdown-content > :global(h3),
	.markdown-content > :global(h4),
	.markdown-content > :global(h5),
	.markdown-content > :global(h6) {
		margin-block-start: var(--spacing-8, 2rem);
	}

	.markdown-content > :global(h1:first-child),
	.markdown-content > :global(h2:first-child),
	.markdown-content > :global(h3:first-child),
	.markdown-content > :global(h4:first-child),
	.markdown-content > :global(h5:first-child),
	.markdown-content > :global(h6:first-child) {
		margin-block-start: 0;
	}
</style>
