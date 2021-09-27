<script>
  // We cannot use TypeScript in mdsvex layout files:
  // https://github.com/pngwn/MDsveX/issues/116

  /**
   * @typedef { import('$lib/types/post-frontmatter.type').default} PostFrontmatter
   * @typedef {import('$lib/types/post-metadata.type').PostMetadata} PostMetadata
   */
  import { format } from 'date-fns';
  import { normalize } from '$lib/posts';
  import SEO from '$lib/components/seo.svelte';
  import H1 from '$lib/components/h1.svelte';

  const frontmatter = /** @type {PostFrontmatter} */ ({ ...$$restProps });

  /** @type {PostMetadata} */
  const post = normalize(frontmatter);
</script>

<article>
  <SEO title={post.title} description={post.description} />
  <div class="flex flex-col mb-3 md:mb-6 space-y-3">
    <H1>{post.title}</H1>
    <div class="text-lg mb-3">
      {post.author.name} •
      <time dateTime={format(new Date(post.updated), 'yyyy-MM-dd')}>
        {format(new Date(post.updated), 'MMM d, yyyy')}
      </time>
      (last update)
    </div>
    <div class="space-x-2">
      {#each post.tags as tag (tag.key)}
        <a
          href={tag.path}
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-background bg-primary-lighter"
        >
          {tag.label}
        </a>
      {/each}
    </div>
  </div>
  <div class="prose md:prose-lg w-full">
    <slot />
  </div>
  {#if post.links}
    <div
      class="prose md:prose-lg w-full border-t-4 border-primary-lighter mt-6 pt-4"
    >
      <h2>Links</h2>
      <ul>
        {#each post.links as link (link.href)}
          <li>
            <a href={link.href}>{link.title}</a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  <div class="text-base mt-6">
    Original post date:
    <time dateTime={format(new Date(post.date), 'yyyy-MM-dd')}>
      {format(new Date(post.date), 'MMM d, yyyy')}
    </time>
  </div>
</article>
