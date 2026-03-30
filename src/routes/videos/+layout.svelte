<script lang="ts">
	import { VideoList } from '$lib/components';
	import { ListVideo } from '@lucide/svelte';
	import { SeoCanonicalUrl, VideoHeader, VideoPlayer, Button } from '@maiertech/sveltekit-helpers';
	import { siYoutube } from 'simple-icons';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<SeoCanonicalUrl origin={data.origin} />

<div class="flex flex-wrap gap-10">
	<div
		// `basis-0` to prevent `basis-auto`, which resolves to intrinsic width of longest para.
		class="grow-999 basis-0 min-inline-3/5"
	>
		<VideoHeader value={data.video} class="mb-12" />

		<VideoPlayer value={data.video} class="mb-8" />

		<Button href={`https://www.youtube.com/watch?v=${data.video.id}`} class="mb-8">
			{#snippet icon()}
				<svg class="block size-4" viewBox="0 0 24 24" fill="currentColor" role="img">
					<path d={siYoutube.path} />
					<title>{siYoutube.title}</title>
				</svg>
			{/snippet}
			Watch on YouTube
		</Button>

		{@render children()}

		<p aria-hidden="true" class="mt-8 text-center text-lg text-ink-muted">◆ ◆ ◆</p>
	</div>

	<aside class="flex grow basis-2xs flex-col gap-3">
		<h2 class="flex items-center gap-2 text-ink-muted">
			<ListVideo class="size-5" />
			<span class="text-lg font-semibold">More videos</span>
		</h2>
		<VideoList values={data.recommendedVideos} level={3} />
	</aside>
</div>
