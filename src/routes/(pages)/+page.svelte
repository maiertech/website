<script>
	import Posts from '$lib/components/posts.svelte';
	import Button from '$lib/components/button.svelte';
	import SeoHomepageSupplement from '$lib/components/seo-homepage-supplement.svelte';

	export let data;
</script>

<SeoHomepageSupplement name={data.seo.title} url={data.canonical_origin} />

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
	.about p {
		color: var(--text-2);
		font-size: var(--size-4);
		font-weight: var(--font-weight-5);
		line-height: var(--font-lineheight-3);
		max-inline-size: var(--size-content-3);
		margin-block-end: var(--size-8);
	}

	@media (min-width: 1024px) {
		.about p {
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
	}

	.topics article {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--size-fluid-3);
		background-color: var(--surface-2);
		border-radius: var(--radius-2);
		padding: var(--size-fluid-2);
	}

	.topics h2 {
		font-size: var(--size-fluid-3);
		font-weight: var(--font-weight-7);
	}

	.topics p {
		flex: 1;
	}

	@media (min-width: 768px) {
		section.topics {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 1024px) {
		section.topics {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
