<script>
	import SEO from '$lib/components/seo.svelte';

	export let data;
	const { title, description, posts } = data;
</script>

<SEO {title} {description} />

<h1 class="text-gradient">{title}</h1>

<ul>
	{#each posts as post (post.path)}
		<li>
			<a href={post.path}>{post.title}</a>
		</li>
	{/each}
</ul>

<style>
	h1 {
		margin-bottom: var(--size-fluid-2);
	}
</style>
