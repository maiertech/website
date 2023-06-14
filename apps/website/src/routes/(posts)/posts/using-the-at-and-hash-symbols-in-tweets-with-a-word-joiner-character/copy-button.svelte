<script>
	import copy from '$lib/actions/copy';
	import timer from '$lib/actions/timer';

	/** @type {string} */
	export let copyText;

	/** @type {string} */
	let message;

	let isVisible = false;

	/** Handler for when you click copy. */
	function copied_handler() {
		message = 'Copied!';
		isVisible = true;
	}

	/** Handler for when the timer runs out. */
	function timeout_handler() {
		isVisible = !isVisible;
	}
</script>

<label>
	<button use:copy={copyText} on:custom:copied={copied_handler}>
		<slot />
	</button>
	{#if isVisible}
		<span use:timer={2000} on:custom:timeout={timeout_handler}>{message}</span>
	{/if}
</label>

<style>
	label {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--size-3);
	}
</style>
