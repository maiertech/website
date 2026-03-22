<script lang="ts">
	import { H1, VideoPreview } from '@maiertech/sveltekit-helpers';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<H1 class="mb-8">{data.seo.title}</H1>

<div class="@container">
	<div class="grid grid-cols-1 gap-5 @lg:grid-cols-2 @4xl:grid-cols-3">
		{#each data.videos as video (video.path)}
			<VideoPreview value={video} />
		{/each}
	</div>
</div>
