<script>
	import { Button, Posts } from '$lib/components';

	export let data;
</script>

<section class="about">
	<p>{data.seo.description}</p>
</section>

<section class="posts">
	<Posts posts={data.posts} />
</section>

<section class="topics">
	{#each data.topics as topic (topic.label)}
		<article>
			<h2>{topic.label}</h2>
			<p>{topic.description}</p>
			<a href={topic.path}><Button large>Check out posts</Button></a>
		</article>
	{/each}
</section>

<style>
	.about {
		color: var(--text-2);
		font-size: var(--size-4);
		font-weight: var(--font-weight-5);
		font-family: var(--font-sans);
		line-height: var(--font-lineheight-3);
		max-inline-size: var(--size-content-2);
		margin-block-end: var(--size-8);

		@media (min-width: 1024px) {
			font-size: var(--size-5);
			line-height: var(--font-lineheight-2);
		}
	}

	.posts {
		margin-block-end: var(--size-8);
	}

	.topics {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: var(--size-fluid-3);
		font-family: var(--font-sans);

		@media (min-width: 768px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		@media (min-width: 1024px) {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		& article {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: var(--size-fluid-3);
			background-color: var(--surface-2);
			border-radius: var(--radius-2);
			padding: var(--size-fluid-2);
		}

		& p {
			flex: 1;
			line-height: var(--font-lineheight-2);
		}
	}
</style>
