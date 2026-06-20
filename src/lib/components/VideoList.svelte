<script lang="ts">
	import { VideoPreview, type Video } from '@maiertech/sveltekit-helpers';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		values: Video[];
		as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		class?: string;
	}

	let { values, as, class: className }: Props = $props();
</script>

<div data-component="VideoList" class={twMerge(className, 'flex flex-wrap gap-6')}>
	{#each values as video (video.id)}
		<VideoPreview value={video} {as} showDescription={false} class="grow basis-xs" />
	{/each}
</div>
