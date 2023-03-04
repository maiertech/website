<script>
	import sdk from '@stackblitz/sdk';
	import { onMount } from 'svelte';

	/** @type {import('@stackblitz/sdk').Project | string} */
	export let project;

	/** @type {import('@stackblitz/sdk').EmbedOptions} */
	export let embedOptions = {};

	/** @type {HTMLElement} */
	let element;

	/**
	 * https://developer.stackblitz.com/docs/platform/javascript-sdk#embed-options
	 * @type {import('@stackblitz/sdk').EmbedOptions}
	 */
	let defaultEmbedOptions = {};

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
