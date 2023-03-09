<script>
	import StackBlitzEmbed from '$lib/components/stackblitz-embed.svelte';

	/** @type {import('@stackblitz/sdk').Project} */
	let project;

	$: (async function () {
		project = {
			template: 'node',
			title: 'Compute ticks for different scenarios',
			description: 'Ticks makes sure you get nicely rounded numbers.',
			files: {
				'index.html': (await import('../index.html?raw')).default,
				'main.js': (await import('./main?raw')).default,
				'ticks.js': (await import('./ticks?raw')).default,
				'package.json': (await import('../package.json?raw')).default
			}
		};
	})();

	/** @type {import('@stackblitz/sdk').EmbedOptions} */
	const options = {
		clickToLoad: true,
		openFile: 'ticks.js'
	};
</script>

<StackBlitzEmbed {project} {options} />
