<script>
  // We cannot use TypeScript in mdsvex layout files:
  // https://github.com/pngwn/MDsveX/issues/116

  /**
   * @typedef {import('$lib/types/post-frontmatter.type').default} PostFrontmatter
   * @typedef {import('$lib/types/post-metadata.type').PostMetadata} PostMetadata
   */
  import { normalize } from '$lib/posts';
  import SEO from '$lib/components/seo.svelte';
  import H1 from '$lib/components/h1.svelte';

  const frontmatter = /** @type {PostFrontmatter} */ ({ ...$$restProps });

  /** @type {PostMetadata} */
  const post = normalize(frontmatter);
</script>

<article>
  <SEO
    title={post.title}
    description={post.description}
    published={post.date}
    modified={post.updated}
    category={post.category.label}
    tags={post.tags?.map((tag) => tag.label)}
  />
  <div class="mb-3 flex flex-col space-y-3 md:mb-6">
    <H1>{post.title}</H1>
    <div class="mb-3 text-lg">
      {post.author.name} •
      <time dateTime={post.updated}>
        {new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
          timeZone: 'UTC',
        }).format(new Date(post.updated))}
      </time>
      (last modified)
    </div>
    {#if post.tags}
      <div class="space-x-2">
        {#each post.tags as tag (tag.key)}
          <a
            href={tag.path}
            class="inline-flex items-center rounded-full bg-primary-lighter px-2.5 py-0.5 text-xs font-medium text-background"
          >
            {tag.label}
          </a>
        {/each}
      </div>
    {/if}
  </div>
  <div class="prose w-full md:prose-lg">
    <slot />
  </div>
  {#if post.links}
    <div
      class="prose mt-6 w-full border-t-4 border-primary-lighter pt-4 md:prose-lg"
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
  <div class="mt-6 text-base">
    Published in
    <a
      href={post.category.path}
      class="inline-flex items-center rounded-full bg-primary-default px-2.5 py-0.5 text-xs font-medium text-background"
    >
      {post.category.label}
    </a>
    on
    <time dateTime={post.date}>
      {new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeZone: 'UTC',
      }).format(new Date(post.date))}
    </time>
    .
  </div>
</article>
