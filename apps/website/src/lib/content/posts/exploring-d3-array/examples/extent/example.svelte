<script>
	import StackBlitzEmbed from '$lib/components/stackblitz-embed.svelte';

	/** @type {import('@stackblitz/sdk').Project} */
	let project;

	$: (async function () {
		project = {
			template: 'node',
			title: 'Compute extent of an array of numbers',
			description: 'The extent of a dataset is an array consisting of minimum and maximum.',
			files: {
				'index.html': (await import('../index.html?raw')).default,
				'main.js': (await import('./main?raw')).default,
				'extent.js': (await import('./extent?raw')).default,
				'package.json': (await import('../package.json?raw')).default
			}
		};
	})();

	/** @type {import('@stackblitz/sdk').EmbedOptions} */
	const options = {
		clickToLoad: true,
		openFile: 'extent.js'
	};
</script>

<StackBlitzEmbed {project} {options} />
