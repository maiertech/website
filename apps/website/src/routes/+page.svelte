<script>
	import Container from '$lib/components/container.svelte';
	import SEO from '$lib/components/seo.svelte';
	import LinkButton from '$lib/components/atoms/link-button.svelte';

	export let data;
	const { title, description, topics } = data;
</script>

<SEO {title} {description} />

<section class="intro">
	<Container padding="0">
		<h1 class="text-gradient">Build better. With Svelte.</h1>
		<p>{description}</p>
	</Container>
</section>

<section class="topics">
	{#each topics as topic (topic.id)}
		<article>
			<h2>{topic.label}</h2>
			<p>{topic.description}</p>
			<LinkButton href={topic.path}>Check out posts</LinkButton>
		</article>
	{/each}
</section>

<style>
	.intro h1 {
		padding-block-end: var(--size-fluid-4);
	}

	.intro p {
		font-size: var(--size-4);
		font-weight: var(--font-weight-5);
		line-height: var(--font-lineheight-3);
		padding-bottom: var(--size-fluid-4);
	}

	section.topics {
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

	/* md */
	@media (min-width: 768px) {
		section.topics {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	/* lg */
	@media (min-width: 1024px) {
		.intro p {
			font-size: var(--size-5);
			line-height: var(--font-lineheight-2);
		}

		section.topics {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
