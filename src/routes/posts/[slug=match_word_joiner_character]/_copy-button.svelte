<script lang="ts">
  import copy from '$lib/actions/copy';
  import timer from '$lib/actions/timer';

  export let copyText: string;

  let message: string;
  let isVisible = false;

  function copiedHandler() {
    message = 'Copied!';
    isVisible = true;
  }

  function timeoutHandler() {
    isVisible = !isVisible;
  }
</script>

<label>
  <button use:copy={copyText} on:custom:copied={copiedHandler}>
    <slot />
  </button>
  {#if isVisible}
    <span use:timer={2000} on:custom:timeout={timeoutHandler}>{message}</span>
  {/if}
</label>

<style>
  label {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--size-3);
  }
</style>
