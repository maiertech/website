<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Note } from '$lib/components';
	import { page } from '$app/state';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

{#if page.data.metadata}
	<Note metadata={page.data.metadata}>
		{@render children()}
	</Note>
{/if}
