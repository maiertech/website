<script lang="ts">
	import { NotePreview, PostPreview, VideoPreview } from '@maiertech/sveltekit-helpers';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1 class="sr-only">Thilo Maier</h1>

<p class="mb-12 max-w-[45ch] text-xl lg:text-2xl">{data.seo.description}</p>

<div class="flex flex-wrap gap-8">
	<!-- not-sidebar -->
	<div class="@container grow-999 min-inline-3/5">
		<div class="mb-8 flex flex-wrap gap-8">
			<!-- Latest video (not-sidebar) -->

			<h2 class="sr-only">Videos</h2>

			<div class="grow-999 min-inline-3/5">
				<VideoPreview value={data.videos[0]} />
			</div>

			<!-- Second video (sidebar) -->
			<div class="grow basis-3xs">
				<VideoPreview value={data.videos[1]} class="h-full" />
			</div>
		</div>

		<h2 class="sr-only">Posts</h2>

		<div class="grid grid-cols-1 gap-6 @xl:grid-cols-2">
			{#each data.posts as post (post.path)}
				<PostPreview value={post} level={3} />
			{/each}
		</div>
	</div>

	<!-- sidebar -->

	<div class="@container grow basis-2xs">
		<h2 class="sr-only">Notes</h2>
		<div class="grid grid-cols-1 gap-6 @lg:grid-cols-2 @4xl:grid-cols-3">
			{#each data.notes as note (note.path)}
				<NotePreview value={note} level={3} />
			{/each}
		</div>
	</div>
</div>
