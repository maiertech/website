<script lang="ts">
  import type { SocialIcon } from '$lib/types/social-icon.type';

  export let icons: SocialIcon[];
</script>

<div>
  {#each icons as icon (icon.key)}
    <a href={icon.href} on:click={icon.onclick} class="icon">
      <svelte:component this={icon.component} title={icon.title} />
    </a>
  {/each}
</div>

<style>
  div {
    width: fit-content;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
    gap: var(--size-fluid-2);
  }

  .icon {
    width: var(--size-fluid-4);
  }
</style>
