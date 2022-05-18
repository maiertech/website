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
  export let status: number;
  export let error: Error;
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<h1>{status}</h1>

{#if error && error.message}
  <p>{error.message}</p>
{/if}
