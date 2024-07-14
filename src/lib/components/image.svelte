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
	 * Aspect ratio.
	 * Use intrinsic aspect ratio if undefined.
	 * @type {number | undefined}
	 */
	export let aspectRatio = undefined;

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
	{aspectRatio}
	layout="fullWidth"
	{breakpoints}
/>
