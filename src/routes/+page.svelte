<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import SEO from '$lib/components/seo.svelte';
	import Topics from '$lib/components/topics.svelte';

	const title = 'Thilo Maier';
	const description =
		"Hi, I'm Thilo. I am a developer based in Rotterdam, NL. I build web apps with SvelteKit and Svelte and keep improving my developer happiness.";
</script>

<SEO {title} {description} />

<section class="intro">
	<Container padding="0">
		<h1 class="text-gradient">Build better. With Svelte.</h1>
		<p>{description}</p>
	</Container>
</section>

<section>
	<Topics />
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

	/* lg */
	@media (min-width: 1024px) {
		.intro p {
			font-size: var(--size-5);
			line-height: var(--font-lineheight-2);
		}
	}
</style>
