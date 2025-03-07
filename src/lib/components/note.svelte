<script lang="ts">
	import type { NoteMetadata } from '$lib/types';
	import type { Snippet } from 'svelte';
	import { LinkIcon } from '$lib/icons';
	import { Badge, formatDate } from '@maiertech/sveltekit-helpers';

	interface Props {
		metadata: NoteMetadata;
		children: Snippet;
	}

	const { metadata, children }: Props = $props();
</script>

<article class="rounded-lg border-4 bg-secondary p-4">
	<header class="mb-4 flex items-center gap-2">
		{#if metadata.link}
			<a
				href={metadata.link}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2"
			>
				<h2 class="text-3xl font-bold">{metadata.title}</h2>
				<LinkIcon class="size-5" />
			</a>
		{:else}
			<h2 class="text-3xl font-bold">{metadata.title}</h2>
		{/if}
		<Badge>{formatDate(metadata.date)}</Badge>
	</header>
	<div class="text-lg">
		{@render children()}
	</div>
</article>
