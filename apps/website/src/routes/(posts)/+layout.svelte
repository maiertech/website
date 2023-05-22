<script>
	import PostFooter from '$lib/components/post-footer.svelte';
	import PostHeader from '$lib/components/post-header.svelte';
	import { Container, PageLayout, SeoPostSupplement } from 'ui';

	export let data;
</script>

<SeoPostSupplement data={data.resolved_post} />

<PageLayout>
	<PostHeader data={data.resolved_post} slot="header" />
	<Container padding={false} max_width="60ch">
		<article>
			<slot />
		</article>
	</Container>
	<div slot="footer">
		{#if data.resolved_post.topics}
			<PostFooter topics={data.resolved_post.topics} />
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
