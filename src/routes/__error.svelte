<script context="module" lang="ts">
  export const load = function ({
    error,
    status,
  }: {
    error: Error;
    status: number;
  }): {
    props: { error: Error; status: number };
  } {
    return {
      props: { error, status },
    };
  };
</script>

<script lang="ts">
  import H1 from '$lib/components/h1.svelte';

  export let status: number;
  export let error: Error;
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<H1>{status}</H1>

<div class="prose w-full md:prose-lg">
  {#if error && error.message}
    <p>{error.message}</p>
  {/if}
</div>
