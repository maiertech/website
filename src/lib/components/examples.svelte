<script lang="ts">
  import type { Example } from '$lib/types/example.type';

  export let examples: Example[];
</script>

<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each examples as example (example.id)}
    <a href={example.href} class="example">
      {example.title}
    </a>
  {/each}
</section>

<style lang="postcss">
  /* Anchor styles need to be scoped to prevent style leaks from `.prose a` when this component is used inside mdsvex file. */
  .example {
    @apply rounded-lg shadow-md text-xl font-bold no-underline hover:underline px-6 py-5 bg-primary-lighter text-background hover:text-background;
  }
</style>
