<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		text: string;
		children: Snippet;
	}

	let { text, children }: Props = $props();
	let showCopied = $state(false);

	async function copyToClipboard() {
		await navigator.clipboard.writeText(text);
		showCopied = true;
		setTimeout(() => {
			showCopied = false;
		}, 1000);
	}
</script>

<div class="relative inline-flex items-center">
	<button onclick={copyToClipboard} class="bg-primary text-surface rounded-md px-4 py-2">
		{@render children()}
	</button>

	{#if showCopied}
		<span class="text-ink absolute -right-16 ml-2 text-sm">Copied!</span>
	{/if}
</div>
