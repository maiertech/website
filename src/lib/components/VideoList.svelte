<script lang="ts">
	import { VideoPreview, type Video } from '@maiertech/sveltekit-helpers';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		values: Video[];
		level: 1 | 2 | 3 | 4 | 5 | 6;
		class?: string;
	}

	let { values, level, class: className }: Props = $props();
</script>

<div data-component="VideoList" class={twMerge(className, 'flex flex-wrap gap-6')}>
	{#each values as video (video.id)}
		<VideoPreview value={video} {level} showDescription={false} class="grow basis-xs" />
	{/each}
</div>
