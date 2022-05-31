<script lang="ts">
  import type Frontmatter from '$lib/types/frontmatter.type';
  import SEO from '$lib/components/seo.svelte';
  const frontmatter: Frontmatter = { ...$$restProps } as Frontmatter;
</script>

<SEO title={frontmatter.title} description={frontmatter.description} />

<article class="prose">
  <h1>{frontmatter.title}</h1>
  <slot />
</article>
