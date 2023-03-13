<script>
	import StackBlitzEmbed from '$lib/components/stackblitz-embed.svelte';
	import index_dot_html from '../index.html?raw';
	import package_dot_json from '../package.json?raw';
	import main_dot_js from './main?raw';
	import range_dot_js from './range?raw';

	/** @type {import('@stackblitz/sdk').Project} */
	let project = {
		template: 'node',
		title: 'Compute range for different scenarios',
		description: 'Range returns an array of evenly spaced numbers.',
		files: {
			'index.html': index_dot_html,
			'main.js': main_dot_js,
			'range.js': range_dot_js,
			'package.json': package_dot_json
		}
	};

	/** @type {import('@stackblitz/sdk').EmbedOptions} */
	const options = {
		clickToLoad: true,
		openFile: 'range.js'
	};
</script>

<StackBlitzEmbed {project} {options} />
