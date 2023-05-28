<script>
	import Author from '$lib/components/author.svelte';
	import { format } from '$lib/utils/date';

	/** @type {import('$lib/types').ResolvedPost} */
	export let post;

	/** @type {boolean} */
	export let large = false;
</script>

<article class:large>
	<div class="content">
		<time datetime={post.published_date}>{format(post.published_date)}</time>
		<h2>{post.title}</h2>
		<p>{post.description}</p>
		<a href={post.path}
			><span class="click" />Continue reading <span aria-hidden="true">&rarr;</span></a
		>
	</div>
	{#if post.author}
		<div class="author">
			<Author data={post.author} {large} />
		</div>
	{/if}
</article>

<style>
	.content {
		position: relative;
	}

	time {
		display: block;
		color: var(--text-2);
		font-size: var(--font-size-1);
		margin-block-end: var(--size-2);
	}

	.large time {
		font-size: var(--font-size-2);
		margin-block-end: var(--size-3);
	}

	h2 {
		font-size: var(--font-size-4);
		font-weight: var(--font-weight-6);
		max-inline-size: var(--size-header-1);
		margin-block-end: var(--size-3);
	}

	.large h2 {
		font-size: var(--font-size-5);
		font-weight: var(--font-weight-7);
		max-inline-size: var(--size-header-2);
		margin-block-end: var(--size-4);
	}

	p {
		line-height: var(--font-lineheight-2);
		max-inline-size: var(--size-content-2);
		margin-block-end: var(--size-3);
	}

	.large p {
		font-size: var(--font-size-3);
		max-inline-size: var(--size-content-3);
		margin-block-end: var(--size-4);
	}

	a {
		font-weight: var(--font-weight-6);
		text-decoration: none;
	}

	.large a {
		font-size: var(--font-size-3);
	}

	.click {
		position: absolute;
		inset: 0;
	}

	.author {
		margin-block-start: var(--size-3);
	}

	.large .author {
		margin-block-start: var(--size-4);
	}
</style>
