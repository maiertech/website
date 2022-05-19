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
        <time dateTime={post.published}>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeZone: 'UTC',
          }).format(new Date(post.published))}
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
