<script>
	import SEO from '$lib/components/seo.svelte';
	import { Button } from 'ui';

	export let data;
	const { title, description, posts } = data;
</script>

<SEO {title} {description} />

<h1 class="text-gradient">{title}</h1>

<div>
	{#each posts as post (post.id)}
		<article>
			<h2>{post.title}</h2>
			<p class="date">
				<time dateTime={post.published}>
					{new Intl.DateTimeFormat('en-US', {
						dateStyle: 'medium',
						timeZone: 'UTC'
					}).format(new Date(post.published))}
				</time>
			</p>
			<p class="description">{post.description}</p>
			<a href={`/posts/${post.slug}`}><Button large>Read post</Button></a>
		</article>
	{/each}
</div>

<style>
	h1 {
		margin-bottom: var(--size-fluid-2);
	}

	div {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--size-content-2)), 1fr));
		gap: var(--size-fluid-4);
	}

	article {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--size-fluid-2);
	}

	h2 {
		font-size: var(--font-size-fluid-2);
	}

	.date {
		color: var(--text-2);
	}

	.description {
		flex: 1;
	}
</style>
