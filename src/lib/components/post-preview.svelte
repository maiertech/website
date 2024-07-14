<script>
	import { Author } from '$lib/components';
	import { formatDate } from '@maiertech/sveltekit-helpers';

	/** @type {import('zod').z.infer<typeof import('@maiertech/sveltekit-helpers').postSchema>} */
	export let post;

	/** @type {boolean} */
	export let large = false;
</script>

<article class:large>
	<div class="content">
		<time datetime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
		<h2>{post.title}</h2>
		<p>{post.description}</p>
		<a href={post.path}>
			Continue reading <span aria-hidden="true">&rarr;</span>
		</a>
	</div>
	{#if post.author}
		<div class="author">
			<Author value={post.author} {large} />
		</div>
	{/if}
</article>

<style>
	.content {
		position: relative;
	}

	time {
		display: block;
		font-family: var(--font-sans);
		font-size: var(--font-size-1);
		color: var(--text-2);
		margin-block-end: var(--size-2);
	}

	h2 {
		font-size: var(--font-size-4);
		font-weight: var(--font-weight-6);
		font-family: var(--font-sans);
		max-inline-size: var(--size-header-1);
		margin-block-end: var(--size-3);
	}

	p {
		line-height: var(--font-lineheight-2);
		max-inline-size: var(--size-content-2);
		margin-block-end: var(--size-3);
	}

	a {
		font-family: var(--font-sans);
		font-weight: var(--font-weight-6);
		text-decoration: none;
		color: var(--link);
	}

	.author {
		margin-block-start: var(--size-3);
	}
	.large {
		& time {
			font-size: var(--font-size-2);
			margin-block-end: var(--size-3);
		}

		& h2 {
			font-size: var(--font-size-5);
			font-weight: var(--font-weight-7);
			max-inline-size: var(--size-header-2);
			margin-block-end: var(--size-4);
		}

		& > p {
			font-size: var(--font-size-3);
			max-inline-size: var(--size-content-3);
			margin-block-end: var(--size-4);
		}

		& a {
			font-size: var(--font-size-3);
		}

		& .author {
			margin-block-start: var(--size-4);
		}
	}
</style>
