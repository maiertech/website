<script>
	import { Image } from '@unpic/svelte';
	import { dev } from '$app/environment';

	/**
	 * Absolute path or URL to origin image.
	 * @type {string}
	 */
	export let src;

	/**
	 * Alt text (not caption).
	 * @type {string}
	 */
	export let alt;

	/**
	 * Intrinsic width.
	 * @type {number}
	 */
	export let width;

	/**
	 * Intrinsic height.
	 * @type {number}
	 */
	export let height;

	/**
	 * Image quality in %.
	 * @type {number}
	 */
	export let quality = 80;

	// Open Props breakpoints.
	// Match widths configured in adapter-vercel.
	const breakpoints = [240, 360, 480, 768, 1024, 1440, 1920];
</script>

<Image
	src={dev ? src : `/_vercel/image?url=${src}&q=${quality}`}
	{alt}
	{width}
	{height}
	layout="constrained"
	{breakpoints}
/>
