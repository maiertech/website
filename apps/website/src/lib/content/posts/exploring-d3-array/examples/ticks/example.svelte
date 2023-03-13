<script>
	import StackBlitzEmbed from '$lib/components/stackblitz-embed.svelte';
	import index_dot_html from '../index.html?raw';
	import package_dot_json from '../package.json?raw';
	import main_dot_js from './main?raw';
	import ticks_dot_js from './ticks?raw';

	/** @type {import('@stackblitz/sdk').Project} */
	const project = {
		template: 'node',
		title: 'Compute ticks for different scenarios',
		description: 'Ticks makes sure you get nicely rounded numbers.',
		files: {
			'index.html': index_dot_html,
			'main.js': main_dot_js,
			'ticks.js': ticks_dot_js,
			'package.json': package_dot_json
		}
	};

	/** @type {import('@stackblitz/sdk').EmbedOptions} */
	const options = {
		clickToLoad: true,
		openFile: 'ticks.js'
	};
</script>

<StackBlitzEmbed {project} {options} />
