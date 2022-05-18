<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async function ({ url, params, fetch }) {
    // Check if category is valid.
    const key = params.category;
    const path = `/categories/${key}.json`;
    const res = await fetch(path);

    if (!res.ok) {
      return {
        status: res.status,
        error: new Error(`Not found: ${url.pathname}.`),
      };
    }

    const { category, posts } = await res.json();

    if (posts.length === 0) {
      return {
        status: 404,
        error: new Error(`Not found: ${url.pathname}.`),
      };
    }

    return {
      props: { category, posts },
    };
  };
</script>

<script lang="ts">
  import type { PostMetadata } from '$lib/types/post-metadata.type';
  import type { Tag } from '$lib/types/tag.type';

  import { goto } from '$app/navigation';
  import SEO from '$lib/components/seo.svelte';

  export let category: Tag;
  export let posts: PostMetadata[];
</script>

<SEO title={`${category.title}`} description={category.description} />

<h1 class="text-gradient">{`${category.title}`}</h1>

<div>
  {#each posts as post (post.path)}
    <article>
      <h2>{post.title}</h2>
      <p class="date">
        <time dateTime={post.modified}>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeZone: 'UTC',
          }).format(new Date(post.modified))}
        </time>
      </p>
      <p class="description">{post.description}</p>
      <button on:click={() => goto(post.path)}>Read post</button>
    </article>
  {/each}
</div>

<style>
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

  article {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--size-fluid-2);
  }

  h2 {
    font-size: var(--font-size-fluid-3);
  }

  .date {
    color: var(--text-2);
  }

  .description {
    flex: 1;
  }
</style>
