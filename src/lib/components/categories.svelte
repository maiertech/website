<script lang="ts">
  import categories from '$lib/data/categories';
  import { goto } from '$app/navigation';

  // Filter categories with `suppress` set to true.
  const validCategories = categories.filter((category) => !category.suppress);
</script>

<section>
  {#each validCategories as category (category.path)}
    <article>
      <h2>{category.title}</h2>
      <p>{category.description}</p>
      <button on:click={() => goto(category.path)}>Check out posts</button>
    </article>
  {/each}
</section>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: var(--size-fluid-3);
  }

  article {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--size-fluid-3);
    background-color: var(--surface-2);
    border-radius: var(--radius-blob-1);
    padding: var(--size-fluid-5);
  }

  h2 {
    font-size: var(--size-fluid-3);
    font-weight: var(--font-weight-7);
  }

  p {
    flex: 1;
  }

  /* md */
  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  /* lg */
  @media (min-width: 1024px) {
    section {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>
