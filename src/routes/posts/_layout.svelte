<script lang="ts">
  import { page } from '$app/stores';
  import { normalize } from '$lib/posts';
  import SEO from '$lib/components/seo.svelte';

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
    category={post.category.label}
    tags={post.tags?.map((tag) => tag.label)}
  />
  <header class="prose">
    <h1>{post.title}</h1>
    <p>
      <span class="published">
        {post.author.name} •
        <time dateTime={post.published}>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeZone: 'UTC',
          }).format(new Date(post.published))}
        </time>
      </span><br />
      <span class="modified">
        Last modified:
        <time dateTime={post.modified}>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeZone: 'UTC',
          }).format(new Date(post.modified))}
        </time>
      </span>
    </p>
    {#if post.tags}
      <ul>
        {#each post.tags as tag (tag.id)}
          <li class="pill">
            <a href={tag.path}>
              {tag.label}
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </header>
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
  <footer>
    Published in
    <span class="pill">
      <a href={post.category.path}>
        {post.category.label}
      </a>
    </span>.
  </footer>
</article>

<style>
  article {
    display: flex;
    flex-direction: column;
    gap: var(--size-fluid-2);
  }

  header {
    display: flex;
    flex-direction: column;
    gap: var(--size-fluid-1);
  }

  header .published {
    font-size: var(--font-size-fluid-1);
    font-weight: var(--font-weight-7);
  }

  header .modified {
    font-size: var(--font-size-fluid-0);
  }

  header ul {
    display: flex;
    gap: var(--size-fluid-1);
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .pill {
    font-size: var(--font-size-fluid-0);
    font-weight: var(--font-weight-6);
    border-radius: var(--radius-round);
    padding: 0.2em 0.6em;
  }

  :is(header, footer) a {
    color: var(--text-1);
  }

  :is(header, footer) a:hover {
    text-decoration: none;
  }

  header .pill {
    background-color: var(--surface-3);
  }

  header .pill:hover {
    background-color: var(--surface-2);
  }

  footer .pill {
    background-color: var(--surface-2);
  }

  footer .pill:hover {
    background-color: var(--surface-3);
  }
</style>
