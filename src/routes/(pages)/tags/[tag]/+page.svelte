<script>
	export let data;
</script>

<h1 class="text-gradient">{data.seo.title}</h1>

<ul>
	{#each data.posts as post (post.path)}
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
