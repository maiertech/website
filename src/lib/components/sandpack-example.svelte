<script lang="ts">
  // This component uses @codesandbox/sandpack-client to create a sandbox to embed.

  import { onMount } from 'svelte';
  import { SandpackClient } from '@codesandbox/sandpack-client';

  import type {
    SandpackClient as SandpackClientType,
    SandboxInfo,
  } from '@codesandbox/sandpack-client';
  import type { EmbedOptions } from '$models/codesandbox.model';

  export let sandboxInfo: SandboxInfo;
  export let embedOptions: EmbedOptions = {};

  let client: SandpackClientType;
  let embedUrl: string;

  const embedQuerystring = new URLSearchParams({
    codemirror: '1',
    hidenavigation: '1',
    ...embedOptions,
  });

  onMount(async () => {
    // Dummy iframe, which will not be rendered.
    const iframe = document.createElement('iframe');
    client = new SandpackClient(iframe, sandboxInfo);
    ({ embedUrl } = await client.getCodeSandboxURL());
  });
</script>

<div class="sandbox">
  {#if embedUrl}
    <iframe
      src={`${embedUrl}?${embedQuerystring}`}
      title="CodeSandbox example"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  {:else}
    <div class="loading">Loading...</div>
  {/if}
</div>

<style>
  .sandbox {
    height: var(--size-fluid-10);
    background-color: var(--surface-2);
    border-radius: var(--radius-3);
  }

  .loading {
    padding: var(--size-fluid-4);
    overflow: auto;
  }

  iframe {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-3);
  }
</style>
