<script lang="ts">
	import { PostPreview } from '@maiertech/sveltekit-helpers';
	import type { ResolvedPost } from '@maiertech/sveltekit-helpers';

	interface Props {
		posts: ResolvedPost[];
	}

	let { posts }: Props = $props();

	// Remove path from tags to avoid nested anchor tags.
	const postsWithoutTagPaths = $derived(
		posts.map((post) => ({
			...post,
			tags: post.tags?.map(({ id, label }) => ({ id, label }))
		}))
	);
</script>

<div data-component="Posts" class="flex flex-col gap-10">
	<PostPreview value={postsWithoutTagPaths[0]} />
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		{#each postsWithoutTagPaths.slice(1) as post (post.path)}
			<PostPreview value={post} />
		{/each}
	</div>
</div>
