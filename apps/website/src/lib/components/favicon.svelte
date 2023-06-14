<script>
	import { onMount } from 'svelte';

	/** @type {'light' | 'dark'} */
	let theme;

	const QUERY = '(prefers-color-scheme: dark)';

	/**
	 * @param {MediaQueryListEvent} e Event that is fired when the mode changes.
	 * @returns {'dark' | 'light'} Mode (light or dark).
	 */
	const handle_change = (e) => (theme = e.matches ? 'dark' : 'light');

	onMount(() => {
		const dark_mode = matchMedia(QUERY);
		// Figure out initial theme.
		theme = dark_mode.matches ? 'dark' : 'light';

		dark_mode.addEventListener('change', handle_change);

		// Clean up event listener when component unmounts.
		return () => dark_mode.removeEventListener('change', handle_change);
	});
</script>

<svelte:head>
	<link
		rel="icon"
		href={theme === 'light' ? '/favicon-light.svg' : '/favicon-dark.svg'}
		type="image/svg+xml"
	/>
</svelte:head>
