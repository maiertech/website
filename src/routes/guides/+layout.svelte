<script lang="ts">
	import { Pager, VideoList } from '$lib/components';
	import { Clock } from '@lucide/svelte';
	import { H1, SeoCanonicalUrl } from '@maiertech/sveltekit-helpers';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<SeoCanonicalUrl origin={data.origin} />

<div class="flex flex-wrap gap-10">
	<!-- `basis-0` to prevent `basis-auto`, which resolves to intrinsic width of longest para. -->
	<div class="grow-999 basis-0 min-inline-3/5">
		<H1 class="mb-12">{data.guide.title}</H1>
		{@render children()}

		<Pager prev={data.prev} next={data.next} class="mt-8" />
	</div>

	<aside class="flex grow basis-2xs flex-col gap-3">
		<h2 class="flex items-center gap-2 text-ink-muted">
			<Clock class="size-5" />
			<span class="text-lg font-semibold">Latest videos</span>
		</h2>
		<VideoList values={data.recommendedVideos} level={3} />
	</aside>
</div>
