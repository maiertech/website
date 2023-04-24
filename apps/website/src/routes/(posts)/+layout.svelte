<script>
	import PostFooter from '$lib/components/post-footer.svelte';
	import PostHeader from '$lib/components/post-header.svelte';
	import { getContext, onDestroy } from 'svelte';
	import { Container, OpenGraphArticle, PageLayout, JsonLdArticle } from 'ui';

	export let data;

	// When this component is mounted, set OpenGraph type to article.
	const is_og_type_website = getContext('is_og_type_website');
	is_og_type_website.set(false);

	// Reset OpenGraph type website (onDestroy also runs during SSR)
	onDestroy(() => is_og_type_website.set(true));
</script>

<OpenGraphArticle
	data={{
		title: data.title,
		description: data.description,
		published_date: data.published_date,
		lastmod_date: data.lastmod_date
	}}
/>
<JsonLdArticle
	data={{
		title: data.title,
		description: data.description,
		published_date: data.published_date,
		lastmod_date: data.lastmod_date
	}}
	author={data.author ? { name: data.author.name, url: data.author.url } : undefined}
/>

<PageLayout>
	<PostHeader
		title={data.title}
		author={data.author?.name}
		published_date={data.published_date}
		lastmod_date={data.lastmod_date}
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
