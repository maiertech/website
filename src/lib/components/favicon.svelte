<script lang="ts">
	import { onMount } from 'svelte';

	let theme: 'light' | 'dark';

	const QUERY = '(prefers-color-scheme: dark)';

	const handleChange = (e: MediaQueryListEvent) => (theme = e.matches ? 'dark' : 'light');

	onMount(() => {
		const darkMode = matchMedia(QUERY);
		// Figure out initial theme.
		theme = darkMode.matches ? 'dark' : 'light';

		darkMode.addEventListener('change', handleChange);

		// Clean up event listener when component unmounts.
		return () => darkMode.removeEventListener('change', handleChange);
	});
</script>

<svelte:head>
	<link
		rel="icon"
		href={theme === 'light' ? '/favicon-light.svg' : '/favicon-dark.svg'}
		type="image/svg+xml"
	/>
</svelte:head>
