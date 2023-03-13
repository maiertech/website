<script>
	import StackBlitzEmbed from '$lib/components/stackblitz-embed.svelte';
	import index_dot_html from '../index.html?raw';
	import package_dot_json from '../package.json?raw';
	import main_dot_js from './main?raw';
	import min_dot_js from './min?raw';

	/** @type {import('@stackblitz/sdk').Project} */
	let project = {
		template: 'node',
		title: 'Compute minimum of array of numbers with missing values',
		description: 'Unlike Math.min, d3.min can handle missing values.',
		files: {
			'index.html': index_dot_html,
			'main.js': main_dot_js,
			'min.js': min_dot_js,
			'package.json': package_dot_json
		}
	};

	/** @type {import('@stackblitz/sdk').EmbedOptions} */
	const options = {
		clickToLoad: true,
		openFile: 'min.js'
	};
</script>

<StackBlitzEmbed {project} {options} />
