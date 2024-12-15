<script lang="ts" module>
	// Custom components for Markdown rendering
	import {
		h1,
		h2,
		h3,
		h4,
		h5,
		h6,
		img,
		p,
		table,
		td,
		th,
		thead
	} from '@maiertech/sveltekit-helpers';
	export { h1, h2, h3, h4, h5, h6, img, p, table, td, th, thead };
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

{@render children()}
