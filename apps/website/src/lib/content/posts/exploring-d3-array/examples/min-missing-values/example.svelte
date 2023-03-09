<script>
	import StackBlitzEmbed from '$lib/components/stackblitz-embed.svelte';

	/** @type {import('@stackblitz/sdk').Project} */
	let project;

	$: (async function () {
		project = {
			template: 'node',
			title: 'Compute minimum of array of numbers with missing values',
			description: 'Unlike Math.min, d3.min can handle missing values.',
			files: {
				'index.html': (await import('../index.html?raw')).default,
				'main.js': (await import('./main?raw')).default,
				'min.js': (await import('./min?raw')).default,
				'package.json': (await import('../package.json?raw')).default
			}
		};
	})();

	/** @type {import('@stackblitz/sdk').EmbedOptions} */
	const options = {
		clickToLoad: true,
		openFile: 'min.js'
	};
</script>

<StackBlitzEmbed {project} {options} />
