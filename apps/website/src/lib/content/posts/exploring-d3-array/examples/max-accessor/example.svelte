<script>
	import StackBlitzEmbed from '$lib/components/stackblitz-embed.svelte';

	/** @type {import('@stackblitz/sdk').Project} */
	let project;

	$: (async function () {
		project = {
			template: 'node',
			title: 'Compute maximum of array of objects using an accessor',
			description: 'An accessor retrieves and transforms a property.',
			files: {
				'index.html': (await import('../index.html?raw')).default,
				'main.js': (await import('./main?raw')).default,
				'max.js': (await import('./max?raw')).default,
				'package.json': (await import('../package.json?raw')).default
			}
		};
	})();

	/** @type {import('@stackblitz/sdk').EmbedOptions} */
	const options = {
		clickToLoad: true,
		openFile: 'max.js'
	};
</script>

<StackBlitzEmbed {project} {options} />
