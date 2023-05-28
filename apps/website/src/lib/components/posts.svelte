<script>
	import PostPreview from '$lib/components/post-preview.svelte';
	/** @type {import('$lib/types').ResolvedPost[]} */
	export let posts;
</script>

<div class="wrapper">
	<PostPreview post={posts[0]} large />
	<div class="more">
		{#each posts.slice(1) as post (post.path)}
			<PostPreview {post} />
		{/each}
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: var(--size-9);
	}

	@media (min-width: 1024px) {
		.wrapper {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.more {
		display: flex;
		flex-direction: column;
		gap: var(--size-8);
	}
</style>
