<script>
	import StackBlitzEmbed from '$lib/components/stackblitz-embed.svelte';

	/** @type {import('@stackblitz/sdk').Project} */
	let project;

	$: (async function () {
		project = {
			template: 'node',
			title: 'Compute range for different scenarios',
			description: 'Range returns an array of evenly spaced numbers.',
			files: {
				'index.html': (await import('../index.html?raw')).default,
				'main.js': (await import('./main?raw')).default,
				'range.js': (await import('./range?raw')).default,
				'package.json': (await import('../package.json?raw')).default
			}
		};
	})();

	/** @type {import('@stackblitz/sdk').EmbedOptions} */
	const options = {
		clickToLoad: true,
		openFile: 'range.js'
	};
</script>

<StackBlitzEmbed {project} {options} />
