<script lang="ts">
	import { page } from '$app/stores';
	import { normalize } from '$lib/posts';
	import SEO from '$lib/components/seo.svelte';
	import Header from '$lib/components/post-header.svelte';
	import Footer from '$lib/components/post-footer.svelte';

	import type { PostFrontmatter } from '$models/frontmatter.model';
	import type { Post } from '$models/content.model';

	const frontmatter: PostFrontmatter = { ...$$restProps } as PostFrontmatter;
	const post: Post = normalize(frontmatter, $page.url.pathname);
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
	<div class="prose">
		<slot />
	</div>
	{#if post.links}
		<section class="prose">
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
</style>
