<script lang="ts">
	import type { EmbedOptions, Files } from '$models/codesandbox.model';
	import { error } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	// This component uses the CodeSandbox API to create a sandbox to embed.

	export let files: Files;
	export let embedOptions: EmbedOptions = {};

	let sandbox_id = '';

	const embedQuerystring = new URLSearchParams({
		codemirror: '1',
		hidenavigation: '1',
		...embedOptions
	});

	onMount(async () => {
		const response = await fetch(`https://codesandbox.io/api/v1/sandboxes/define?json=1`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ files })
		});

		if (!response.ok) {
			const { error: message } = await response.json();
			throw error(response.status, message);
		} else {
			({ sandbox_id } = await response.json());
		}
	});
</script>

<div class="codesandbox">
	{#if sandbox_id}
		<iframe
			src={`https://codesandbox.io/embed/${sandbox_id}?${embedQuerystring}`}
			title="CodeSandbox example"
			allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
			sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
		/>
	{:else}
		<div class="loading">Loading...</div>
	{/if}
</div>

<style>
	.codesandbox {
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
