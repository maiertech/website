<script lang="ts">
  import SEO from '$lib/components/seo.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<SEO title="Posts" description="List of posts." />

<h1 class="text-gradient">Posts</h1>

<div>
  {#each data.posts as post (post.path)}
    <article>
      <h2><a href={post.path}>{post.title}</a></h2>
      {#if post.tags}
        <ul>
          {#each post.tags as tag (tag.id)}
            <li class="pill">
              {tag.label}
            </li>
          {/each}
        </ul>
      {/if}
    </article>
  {/each}
</div>

<style>
  article {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--size-fluid-2);
  }

  h1 {
    margin-bottom: var(--size-fluid-2);
  }

  div {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(100%, var(--size-content-2)), 1fr)
    );
    gap: var(--size-fluid-4);
  }

  h2 {
    flex: 1;
    font-size: var(--font-size-fluid-2);
  }

  ul {
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
    background-color: var(--surface-2);
    padding: 0.2em 0.6em;
  }
</style>
