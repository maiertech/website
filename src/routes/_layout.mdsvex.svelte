<script>
  // We cannot use TypeScript in mdsvex layout files:
  // https://github.com/pngwn/MDsveX/issues/116

  /**
   * @typedef {import('$lib/types/frontmatter.type').default} Frontmatter
   */

  import SEO from '$lib/components/seo.svelte';
  import H1 from '$lib/components/h1.svelte';

  const frontmatter = /** @type {Frontmatter} */ ({ ...$$restProps });
</script>

<SEO title={frontmatter.title} description={frontmatter.description} />

<div class="mb-3 md:mb-6">
  <H1>{frontmatter.title}</H1>
</div>

<div class="prose w-full md:prose-lg">
  <slot />
</div>
