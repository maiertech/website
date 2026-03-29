<script lang="ts">
	import { VideoList } from '$lib/components';
	import { Clock } from '@lucide/svelte';
	import { PostHeader, SeoCanonicalUrl, SeoLdPost } from '@maiertech/sveltekit-helpers';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<SeoLdPost value={data.post} />
<SeoCanonicalUrl origin={data.origin} />

<div class="flex flex-wrap gap-10">
	<div
		// `basis-0` to prevent `basis-auto`, which resolves to intrinsic width of longest para.
		class="grow-999 basis-0 min-inline-3/5"
	>
		<PostHeader value={data.post} class="mb-12" />
		{@render children()}

		<p aria-hidden="true" class="mt-8 text-center text-xl text-ink-muted">◆◆◆</p>
	</div>

	<aside class="flex grow basis-2xs flex-col gap-3">
		<h2 class="flex items-center gap-1 text-ink-muted">
			<Clock class="size-5" />
			<span class="text-lg font-semibold">Latest videos</span>
		</h2>
		<VideoList values={data.recommendedVideos} level={3} />
	</aside>
</div>
