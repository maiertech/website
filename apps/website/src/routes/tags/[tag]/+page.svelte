<script>
	import SEO from '$lib/components/seo.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	const { title, posts } = data;
</script>

<SEO {title} description={`Posts about ${title}.`} />

<h1 class="text-gradient">{title}</h1>

<ul>
	{#each posts as post (post.id)}
		<li>
			<a href={`/posts/${post.slug}`}>{post.title}</a>
		</li>
	{/each}
</ul>

<style>
	h1 {
		margin-bottom: var(--size-fluid-2);
	}
</style>
