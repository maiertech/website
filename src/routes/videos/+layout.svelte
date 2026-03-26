<script lang="ts">
	import { SeoCanonicalUrl, VideoHeader, VideoPlayer, Button } from '@maiertech/sveltekit-helpers';
	import { siYoutube } from 'simple-icons';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<SeoCanonicalUrl origin={data.origin} />

<VideoHeader value={data.video} class="mb-12" />

<VideoPlayer value={data.video} class="mb-8" />

<div class="mb-8 flex justify-end">
	<Button href={`https://www.youtube.com/watch?v=${data.video.id}`}>
		{#snippet icon()}
			<svg class="block size-4" viewBox="0 0 24 24" fill="currentColor" role="img">
				<path d={siYoutube.path} />
				<title>{siYoutube.title}</title>
			</svg>
		{/snippet}
		Watch on YouTube
	</Button>
</div>

{@render children()}
