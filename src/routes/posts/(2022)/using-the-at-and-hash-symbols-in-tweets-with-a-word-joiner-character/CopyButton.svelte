<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Button } from '@maiertech/sveltekit-helpers';

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
	<Button onclick={copyToClipboard}>
		{@render children()}
	</Button>

	{#if showCopied}
		<span class="absolute -right-16 ml-2 text-sm">Copied!</span>
	{/if}
</div>
