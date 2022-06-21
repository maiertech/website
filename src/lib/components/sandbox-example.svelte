<script lang="ts">
  // This component uses the CodeSandbox API to create a sandbox to embed.

  import { onMount } from 'svelte';

  import type { ApiError } from '$models/api.model';
  import type { EmbedOptions, Files } from '$models/codesandbox.model';

  export let files: Files;
  export let embedOptions: EmbedOptions = {};

  let sandbox_id = '';
  let error: ApiError;

  const embedQuerystring = new URLSearchParams({
    codemirror: '1',
    hidenavigation: '1',
    ...embedOptions,
  });

  onMount(async () => {
    const response = await fetch(
      `https://codesandbox.io/api/v1/sandboxes/define?json=1`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ files }),
      }
    );

    if (!response.ok) {
      const { error: message } = await response.json();
      error = {
        status: response.status,
        code: 'FAILED_TO_FETCH_SANDBOX_ID',
        message,
      };
    } else {
      ({ sandbox_id } = await response.json());
    }
  });
</script>

<div class="sandbox">
  {#if sandbox_id}
    <iframe
      src={`https://codesandbox.io/embed/${sandbox_id}?${embedQuerystring}`}
      title="CodeSandbox example"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  {:else if error}
    <div class="loading">
      <p>{error.code} ({error.status})</p>
      <p>{error.message}</p>
    </div>
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
