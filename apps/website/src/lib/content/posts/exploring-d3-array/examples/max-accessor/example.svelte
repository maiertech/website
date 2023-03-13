<script>
	import StackBlitzEmbed from '$lib/components/stackblitz-embed.svelte';
	import index_dot_html from '../index.html?raw';
	import package_dot_json from '../package.json?raw';
	import main_dot_js from './main?raw';
	import max_dot_js from './max?raw';

	/** @type {import('@stackblitz/sdk').Project} */
	const project = {
		template: 'node',
		title: 'Compute maximum of array of objects using an accessor',
		description: 'An accessor retrieves and transforms a property.',
		files: {
			'index.html': index_dot_html,
			'main.js': main_dot_js,
			'max.js': max_dot_js,
			'package.json': package_dot_json
		}
	};

	/** @type {import('@stackblitz/sdk').EmbedOptions} */
	const options = {
		clickToLoad: true,
		openFile: 'max.js'
	};
</script>

<StackBlitzEmbed {project} {options} />
