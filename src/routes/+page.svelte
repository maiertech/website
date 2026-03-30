<script lang="ts">
	import { NoteList, PostList } from '$lib/components';
	import { VideoPreview } from '@maiertech/sveltekit-helpers';
	import type { PageProps } from './$types';
	import { Clock } from '@lucide/svelte';

	let { data }: PageProps = $props();
</script>

<h1 class="sr-only">Thilo Maier</h1>

<p class="mb-10 text-2xl font-semibold text-balance lg:mb-12 lg:text-3xl">{data.seo.description}</p>

<div class="flex flex-wrap gap-6">
	<div
		// Not-sidebar (outer): videos & posts.
		class="grow-999 basis-0 min-inline-3/5"
	>
		<h2 class="mb-4 flex items-center gap-2 text-ink-muted">
			<Clock class="size-5" />
			<span class="text-lg font-semibold">Latest videos</span>
		</h2>

		<div class="mb-8 flex flex-wrap gap-6">
			<VideoPreview
				// Not-sidebar (videos): latest video.
				value={data.videos[0]}
				level={3}
				class="grow-999 min-inline-3/5"
			/>

			<div
				// Sidebar (videos): 2 more videos.
				class="flex grow basis-3xs flex-wrap gap-6"
			>
				{#each data.videos.slice(1) as video (video.id)}
					<VideoPreview value={video} level={3} showDescription={false} class="grow basis-80" />
				{/each}
			</div>
		</div>

		<h2 class="mb-4 flex items-center gap-2 text-ink-muted">
			<Clock class="size-5" />
			<span class="text-lg font-semibold">Latest posts</span>
		</h2>

		<PostList values={data.posts} level={3} />
	</div>

	<div
		// Sidebar (outer): notes.
		class="@container grow basis-2xs"
	>
		<h2 class="mb-4 flex items-center gap-2 text-ink-muted">
			<Clock class="size-5" />
			<span class="text-lg font-semibold">Latest notes</span>
		</h2>

		<NoteList values={data.notes} level={3} />
	</div>
</div>
