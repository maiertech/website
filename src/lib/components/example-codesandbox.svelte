<script lang="ts">
  import { onMount } from 'svelte';

  import type { ApiError } from '$models/api.model';
  import type { EmbedOptions } from '$models/codesandbox.model';

  type Files = {
    [path: string]: { content: string; isBinary?: boolean };
  };

  export let files: Files;

  let state: 'loading' | 'loaded' | { error: ApiError } = 'loading';
  let sandbox_id: string;
  let embedOptions: EmbedOptions;

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
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ files }),
      }
    );

    if (!response.ok) {
      const { error: message } = await response.json();
      state = {
        error: {
          status: response.status,
          code: 'FAILED_TO_FETCH_SANDBOX_ID',
          message,
        },
      };
    } else {
      ({ sandbox_id } = await response.json());
      state = 'loaded';
    }
  });
</script>

<div class="sandbox">
  {#if state === 'loading'}
    <div class="state">Loading...</div>
  {:else if state === 'loaded'}
    <iframe
      src={`https://codesandbox.io/embed/${sandbox_id}?${embedQuerystring}`}
      title="CodeSandbox example"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  {:else}
    <div class="state">
      <p>{state.error.code} ({state.error.status})</p>
      <p>{state.error.message}</p>
    </div>
  {/if}
</div>

<style>
  .sandbox {
    height: var(--size-fluid-10);
    background-color: var(--surface-2);
    border-radius: var(--radius-3);
  }

  .state {
    padding: var(--size-fluid-4);
    overflow: auto;
  }

  iframe {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-3);
  }
</style>
