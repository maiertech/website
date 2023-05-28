<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	/** @type {number} */
	export let ratio = 16 / 9;

	/** @type {string} */
	export let alt;

	/** @type {string} */
	export let url;

	/** @type {'eager' | 'lazy'} */
	export let loading = 'eager';

	/** @type {boolean} */
	export let round = false;

	/** @type {string} */
	let src;

	/** @type {string} */
	let srcset;

	/**
	 * Cover is probably all we need:
	 * https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
	 * @type {string}
	 */
	let fit = 'cover';

	onMount(async () => {
		const response = await fetch(`${$page.url.origin}/api/image?${new URLSearchParams({ url })}`);
		({ src, srcset } = await response.json());
	});
</script>

<div style:--ratio={ratio}>
	<img {...$$restProps} {alt} {src} {srcset} {loading} style:--fit={fit} class:round />
</div>

<style>
	div {
		width: 100%;
		aspect-ratio: var(--ratio);
	}

	img {
		background-color: var(--surface-2);
		width: 100%;
		object-fit: var(--fit);
	}

	.round {
		border-radius: var(--radius-round);
	}
</style>
