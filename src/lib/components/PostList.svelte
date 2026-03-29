<script lang="ts">
	import { PostPreview, type Post } from '@maiertech/sveltekit-helpers';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		values: Post[];
		level: 1 | 2 | 3 | 4 | 5 | 6;
		class?: string;
	}

	let { values, level, class: className }: Props = $props();
</script>

<div data-component="PostList" class={twMerge(className, 'flex flex-wrap gap-6')}>
	{#each values as post (post.path)}
		<PostPreview value={post} {level} class="grow basis-xs" />
	{/each}
</div>
