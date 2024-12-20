<script lang="ts" module>
	// Custom components for Markdown rendering
	import {
		code,
		h1,
		h2,
		h3,
		h4,
		h5,
		h6,
		img,
		ol,
		p,
		table,
		td,
		th,
		thead,
		ul
	} from '@maiertech/sveltekit-helpers';
	// eslint-disable-next-line no-import-assign
	export { code, h1, h2, h3, h4, h5, h6, img, ol, p, table, td, th, thead, ul };
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

{@render children()}
