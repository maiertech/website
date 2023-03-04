<script>
	import StackBlitz from '$lib/components/stackblitz.svelte';
	import index_html from '../index.html?raw';
	import package_json from '../package.json?raw';
	import main_js from './main?raw';
	import ticks_js from './ticks?raw';

	/** @type {import('@stackblitz/sdk').Project} */
	const project = {
		template: 'node',
		title: 'Compute ticks for different scenarios',
		description: 'Ticks makes sure you get nicely rounded numbers.',
		files: {
			'index.html': index_html,
			'main.js': main_js,
			'ticks.js': ticks_js,
			'package.json': package_json
		}
	};

	/** @type {import('@stackblitz/sdk').EmbedOptions} */
	const embedOptions = {
		clickToLoad: true,
		openFile: 'ticks.js'
	};
</script>

<StackBlitz {project} {embedOptions} />
