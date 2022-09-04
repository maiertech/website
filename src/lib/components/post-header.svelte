<script lang="ts">
	import Tags from '$lib/components/tags.svelte';
	import type { Post } from '$models/content.model';

	export let post: Post;
</script>

<header>
	<h1>{post.title}</h1>
	<div>
		<span class="published">
			{post.author.name} •
			<time dateTime={post.published}>
				{new Intl.DateTimeFormat('en-US', {
					dateStyle: 'medium',
					timeZone: 'UTC'
				}).format(new Date(post.published))}
			</time>
		</span><br />
		<span class="modified">
			Last modified:
			<time dateTime={post.modified}>
				{new Intl.DateTimeFormat('en-US', {
					dateStyle: 'medium',
					timeZone: 'UTC'
				}).format(new Date(post.modified))}
			</time>
		</span>
	</div>
	{#if post.tags}
		<Tags tags={post.tags} />
	{/if}
</header>

<style>
	header {
		display: flex;
		flex-direction: column;
		gap: var(--size-fluid-3);
	}

	h1 {
		font-size: var(--font-size-fluid-3);
		line-height: var(--font-lineheight-1);
	}

	.published {
		font-size: var(--font-size-fluid-1);
		font-weight: var(--font-weight-7);
	}

	.modified {
		font-size: var(--font-size-fluid-0);
	}
</style>
