<script lang="ts">
	import { NoteHeader, SeoCanonicalUrl, VideoPreview } from '@maiertech/sveltekit-helpers';
	import type { LayoutProps } from './$types';
	import { Clock } from '@lucide/svelte';

	let { data, children }: LayoutProps = $props();
</script>

<SeoCanonicalUrl origin={data.origin} />

<div class="flex flex-wrap gap-10">
	<div
		// `basis-0` to prevent `basis-auto`, which resolves to intrinsic width of longest para.
		class="grow-999 basis-0 min-inline-3/5"
	>
		<NoteHeader value={data.note} class="mb-8" />
		{@render children()}
	</div>

	<aside class="flex grow basis-2xs flex-col gap-3">
		<h2 class="flex items-center gap-1 text-ink-muted">
			<Clock class="size-5" />
			<span class="text-lg font-semibold">My latest videos</span>
		</h2>
		{#each data.recommendedVideos as video (video.id)}
			<VideoPreview value={video} class="mb-4" showDescription={false} />
		{/each}
	</aside>
</div>
