<script>
	import StackBlitzEmbed from '$lib/components/stackblitz-embed.svelte';
	import package_dot_json from '../package.json?raw';
	import index_dot_html from '../index.html?raw';
	import extent_dot_js from './extent?raw';
	import main_dot_js from './main?raw';

	/** @type {import('@stackblitz/sdk').Project} */
	const project = {
		template: 'node',
		title: 'Compute extent of an array of numbers',
		description: 'The extent of a dataset is an array consisting of minimum and maximum.',
		files: {
			'index.html': index_dot_html,
			'main.js': main_dot_js,
			'extent.js': extent_dot_js,
			'package.json': package_dot_json
		}
	};

	/** @type {import('@stackblitz/sdk').EmbedOptions} */
	const options = {
		clickToLoad: true,
		openFile: 'extent.js'
	};
</script>

<StackBlitzEmbed {project} {options} />
