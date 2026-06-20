<script lang="ts">
	import { PostPreview, type Post } from '@maiertech/sveltekit-helpers';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		values: Post[];
		as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		class?: string;
	}

	let { values, as, class: className }: Props = $props();
</script>

<div data-component="PostList" class={twMerge(className, 'flex flex-wrap gap-6')}>
	{#each values as post (post.path)}
		<PostPreview value={post} {as} class="grow basis-xs" />
	{/each}
</div>
