<script lang="ts" module>
	// Custom components for Markdown rendering
	import {
		Code as code,
		H1 as h1,
		H2 as h2,
		H3 as h3,
		H4 as h4,
		H5 as h5,
		H6 as h6,
		Ol as ol,
		P as p,
		Table as table,
		Td as td,
		Th as th,
		Thead as thead,
		Ul as ul
	} from '@maiertech/sveltekit-helpers';
	// eslint-disable-next-line no-import-assign
	export { code, h1, h2, h3, h4, h5, h6, ol, p, table, td, th, thead, ul };
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

{@render children()}
