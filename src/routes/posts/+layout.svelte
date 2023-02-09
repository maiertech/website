<script>
	import { page } from '$app/stores';
	import Footer from '$lib/components/post-footer.svelte';
	import Header from '$lib/components/post-header.svelte';
	import SEO from '$lib/components/seo.svelte';

	/** @type {import('$lib/types').Post} */
	const post = $page.data.post;
</script>

<article>
	<SEO
		title={post.title}
		description={post.description}
		published={post.published}
		modified={post.modified}
		topics={post.topics?.map((topic) => topic.label)}
		tags={post.tags?.map((tag) => tag.label)}
	/>
	<Header {post} />
	<div class="global">
		<slot />
	</div>
	{#if post.links}
		<section class="global">
			<h2>Links</h2>
			<ul>
				{#each post.links as link (link.href)}
					<li>
						<a href={link.href}>{link.title}</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
	<Footer {post} />
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
