<script lang="ts">
	import type { LayoutProps } from './$types';
	import { Video, VideoHeader } from '@maiertech/sveltekit-helpers';

	let { data, children }: LayoutProps = $props();
</script>

<VideoHeader value={data.video} class="mb-12" />

<Video id={data.video.id} class="mb-8" />

{@render children()}
