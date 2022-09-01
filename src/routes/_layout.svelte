<script lang="ts">
	import SEO from '$lib/components/seo.svelte';
	import type { Frontmatter } from '$models/frontmatter.model';

	const frontmatter: Frontmatter = { ...$$restProps } as Frontmatter;
</script>

<SEO title={frontmatter.title} description={frontmatter.description} />

<article class="prose">
	<h1>{frontmatter.title}</h1>
	<slot />
</article>
