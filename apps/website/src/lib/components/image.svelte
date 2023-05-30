<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	/** @type {string} */
	export let alt;

	/** @type {string} */
	export let src;

	/** @type {number} */
	export let ratio = 16 / 9;

	/** @type {'eager' | 'lazy'} */
	export let loading = 'eager';

	/** @type {boolean} */
	export let round = false;

	/**
	 * Set to base64 encoded fallback image (1x1, light surface-2).
	 * Encoded with https://png-pixel.com/.
	 * @type {string} */
	let imgix_src =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO88h8AAq0B1REmZuEAAAAASUVORK5CYII=';

	/** @type {string} */
	let imgix_srcset;

	/**
	 * Cover is probably all we need:
	 * https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
	 * @type {string}
	 */
	let fit = 'cover';

	onMount(async () => {
		const response = await fetch(
			`${$page.url.origin}/api/image?${new URLSearchParams({ url: src })}`
		);
		({ src: imgix_src, srcset: imgix_srcset } = await response.json());
	});
</script>

<div style:--ratio={ratio}>
	<img
		{...$$restProps}
		{alt}
		src={imgix_src}
		srcset={imgix_srcset}
		{loading}
		style:--fit={fit}
		class:round
	/>
</div>

<style>
	div {
		aspect-ratio: var(--ratio);
		inline-size: 100%;
	}

	img {
		background-color: var(--surface-2);
		block-size: 100%;
		inline-size: 100%;
		object-fit: var(--fit);
	}

	.round {
		border-radius: var(--radius-round);
	}
</style>
