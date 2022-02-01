<script lang="ts">
  import type { Example } from '$lib/types/example.type';

  export let examples: Example[];
</script>

<section class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {#each examples as example (example.id)}
    <a href={example.href} class="example">
      {example.title}
    </a>
  {/each}
</section>

<style lang="postcss">
  /* Anchor styles need to be scoped to prevent style leaks from `.prose a` when this component is used inside mdsvex file. */
  .example {
    @apply rounded-lg bg-primary-lighter px-6 py-5 text-xl font-bold text-background no-underline shadow-md hover:text-background hover:underline;
  }
</style>
