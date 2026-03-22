<script lang="ts">
	import { VideoHeader, VideoPlayer } from '@maiertech/sveltekit-helpers';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<VideoHeader value={data.video} class="mb-12" />

<VideoPlayer value={data.video} class="mb-8" />

{@render children()}
