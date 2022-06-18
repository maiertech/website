<script lang="ts">
  import sdk from '@stackblitz/sdk';
  import { onMount } from 'svelte';

  import type { Project, EmbedOptions } from '@stackblitz/sdk';

  export let project: Project;
  export let options: EmbedOptions = {};

  let element: HTMLElement;

  let defaultOptions: EmbedOptions = { view: 'preview' };

  onMount(() => {
    sdk.embedProject(element, project, { ...defaultOptions, ...options });
  });
</script>

<iframe bind:this={element} title="StackBlitz example." />
