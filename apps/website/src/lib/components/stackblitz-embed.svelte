<script>
	import stackblitz from '$lib/actions/stackblitz';

	/**
	 * @typedef {import('@stackblitz/sdk').VM} VM
	 */

	/**
	 * You can either provide an object with a StackBlitz project config
	 * or a string that represents a GitHub repository.
	 * @type {import('@stackblitz/sdk').Project | string} */
	export let project;

	/** @type {import('@stackblitz/sdk').EmbedOptions} */
	export let options = {};

	/** @type {VM} */
	let vm;

	/** @param {Promise<VM>} promise_vm */
	async function cb(promise_vm) {
		vm = await promise_vm;
	}
</script>

<div class="stackblitz">
	<iframe use:stackblitz={{ project, options, cb }} title="This iframe will be swapped out." />
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
