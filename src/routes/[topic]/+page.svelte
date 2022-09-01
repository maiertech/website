<script lang="ts">
  import { goto } from '$app/navigation';
  import SEO from '$lib/components/seo.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<SEO title={`${data.topic.title}`} description={data.topic.description} />

<h1 class="text-gradient">{`${data.topic.title}`}</h1>

<div>
  {#each data.posts as post (post.path)}
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
    font-size: var(--font-size-fluid-2);
  }

  .date {
    color: var(--text-2);
  }

  .description {
    flex: 1;
  }
</style>
