<script>
	import sdk from '@stackblitz/sdk';

	/**
	 * You can either provide an object with a StackBlitz project config
	 * or a string that represents a GitHub repository.
	 * @type {import('@stackblitz/sdk').Project | string} */
	export let project;

	/** @type {import('@stackblitz/sdk').EmbedOptions} */
	export let options = {};

	/** @type {HTMLElement} */
	let element;

	/** @type {import('@stackblitz/sdk').VM} */
	let vm;

	/**
	 * https://developer.stackblitz.com/platform/api/javascript-sdk-options
	 * @type {import('@stackblitz/sdk').EmbedOptions}
	 */
	let default_options = {};

	$: merged_embed_options = { ...default_options, ...options };

	$: (async function () {
		if (typeof project === 'string') {
			vm = await sdk.embedGithubProject(element, project, merged_embed_options);
		} else {
			vm = await sdk.embedProject(element, project, merged_embed_options);
		}
	})();
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
