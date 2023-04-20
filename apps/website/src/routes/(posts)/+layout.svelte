<script>
	import { Container, PageLayout } from 'ui';
	import SEO from '$lib/components/seo.svelte';
	import PostHeader from '$lib/components/post-header.svelte';
	import PostFooter from '$lib/components/post-footer.svelte';

	export let data;
</script>

<SEO
	title={data.title}
	description={data.description}
	published={data.published}
	lastmod={data.lastmod}
/>

<PageLayout>
	<PostHeader
		title={data.title}
		author={data.author?.name}
		published={data.published}
		lastmod={data.lastmod}
		tags={data.tags}
		slot="header"
	/>
	<Container padding={false} max_width="60ch">
		<article>
			<slot />
		</article>
	</Container>
	<div slot="footer">
		{#if data.topics}
			<PostFooter topics={data.topics} />
		{/if}
	</div>
</PageLayout>

<style>
	article {
		display: grid;
		gap: var(--size-fluid-3);
		margin-bottom: var(--size-fluid-4);
	}
</style>
