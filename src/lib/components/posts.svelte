<script lang="ts">
	import { PostPreview } from '@maiertech/sveltekit-helpers';
	import type { PostType } from '@maiertech/sveltekit-helpers';

	interface Props {
		posts: PostType[];
	}

	let { posts }: Props = $props();
</script>

<div data-component="Posts" class="flex flex-col gap-10">
	<PostPreview value={posts[0]} />
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		{#each posts.slice(1) as post (post.path)}
			<PostPreview value={post} />
		{/each}
	</div>
</div>
