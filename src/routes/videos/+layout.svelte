<script lang="ts">
	import {
		SeoCanonicalUrl,
		VideoHeader,
		VideoPlayer,
		WatchOnYouTubeButton
	} from '@maiertech/sveltekit-helpers';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<SeoCanonicalUrl origin={data.origin} />

<VideoHeader value={data.video} class="mb-12" />

<VideoPlayer value={data.video} class="mb-8" />

<WatchOnYouTubeButton value={data.video} class="mb-8" />

{@render children()}
