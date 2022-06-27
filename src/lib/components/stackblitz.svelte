<script lang="ts">
  import sdk from '@stackblitz/sdk';
  import { onMount } from 'svelte';

  import type { Project, EmbedOptions } from '@stackblitz/sdk';

  export let project: Project | string;
  export let embedOptions: EmbedOptions = {};

  let element: HTMLElement;

  // https://developer.stackblitz.com/docs/platform/javascript-sdk#embed-options
  let defaultEmbedOptions: EmbedOptions = {};

  let mergedEmbedOptions: EmbedOptions;
  $: mergedEmbedOptions = { ...defaultEmbedOptions, ...embedOptions };

  function embed() {
    if (typeof project === 'string') {
      sdk.embedGithubProject(element, project, mergedEmbedOptions);
    } else {
      sdk.embedProject(element, project, mergedEmbedOptions);
    }
  }

  onMount(() => {
    embed();
  });
</script>

<div class="stackblitz">
  <iframe bind:this={element} title="This iframe will be swapped out." />
</div>

<style>
  .stackblitz {
    height: var(--size-fluid-10);
    background-color: var(--surface-2);
    border-radius: var(--radius-3);
  }

  iframe {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-3);
  }
</style>
