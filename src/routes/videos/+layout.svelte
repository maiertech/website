<script lang="ts">
	import type { LayoutProps } from './$types';
	import { Video } from '@maiertech/sveltekit-helpers';

	let { data, children }: LayoutProps = $props();
</script>

<Video id={data.video.id} class="mb-8" />

{@render children()}
