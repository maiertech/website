<script lang="ts">
	import { PostPreview } from '$lib/components';
	import type { Post } from '@maiertech/sveltekit-helpers';

	interface Props {
		posts: Post[];
	}

	let { posts }: Props = $props();
</script>

<div data-component="Posts" class="flex flex-col gap-10">
	<PostPreview post={posts[0]} large />
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		{#each posts.slice(1) as post (post.path)}
			<PostPreview {post} />
		{/each}
	</div>
</div>
