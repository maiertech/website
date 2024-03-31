<script>
	import Container from '$lib/components/container.svelte';
	import SeoPostSupplement from '$lib/components/seo-post-supplement.svelte';
	import { PageLayout, PostHeader } from '@maiertech/sveltekit-helpers';

	export let data;
</script>

<SeoPostSupplement data={data.resolved_post} />

<PageLayout>
	<PostHeader post={data.resolved_post} slot="header" />
	<Container padding={false} max_width="60ch">
		<article>
			<slot />
		</article>
	</Container>
</PageLayout>

<style>
	article {
		display: grid;
		/* Prevent grid blowout: https://courses.joshwcomeau.com/css-for-js/07-css-grid/16-managing-overflow. */
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: var(--size-fluid-3);
		margin-bottom: var(--size-fluid-4);
	}
</style>
