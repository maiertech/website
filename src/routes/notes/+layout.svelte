<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Note } from '@maiertech/sveltekit-helpers';
	import { page } from '$app/state';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

{#if page.data.note}
	<Note value={page.data.note}>
		{@render children()}
	</Note>
{/if}
