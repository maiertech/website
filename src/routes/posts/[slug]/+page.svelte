<script>
	import SEO from '$lib/components/seo.svelte';
	import PostHeader from '$lib/components/post-header.svelte';
	import PostFooter from '$lib/components/post-footer.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	const { PostContent, metadata, author, topics, tags } = data;
</script>

<article>
	<SEO
		title={metadata.title}
		description={metadata.description}
		published={metadata.published}
		modified={metadata.modified}
		topics={topics?.map((topic) => topic.label)}
		tags={tags?.map((tag) => tag.label)}
	/>
	<PostHeader
		title={metadata.title}
		author={author.name}
		publishedDate={metadata.published}
		modifiedDate={metadata.modified}
		{tags}
	/>
	<div class="global">
		<PostContent />
	</div>
	{#if metadata.links}
		<section class="global">
			<h2>Links</h2>
			<ul>
				{#each metadata.links as link (link.href)}
					<li>
						<a href={link.href}>{link.title}</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
	{#if topics}
		<PostFooter {topics} />
	{/if}
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		gap: var(--size-fluid-2);
	}

	.global {
		margin-block-end: var(--size-fluid-3);
	}
</style>
