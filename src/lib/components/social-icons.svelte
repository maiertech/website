<script lang="ts">
  import type { SocialIcon } from '$lib/types/social-icon.type';

  export let icons: SocialIcon[];
</script>

<div class="flex flex-wrap justify-center space-x-5">
  {#each icons as icon (icon.key)}
    <a href={icon.href} on:click={icon.onclick}>
      <span class="sr-only">{icon.title}</span>
      <svelte:component this={icon.component} class="h-7 w-7" />
    </a>
  {/each}
</div>
