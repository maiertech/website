<script>
	import StackBlitz from '$lib/components/stackblitz.svelte';
	import index_html from '../index.html?raw';
	import package_json from '../package.json?raw';
	import main_js from './main?raw';
	import max_js from './max?raw';

	/** @type {import('@stackblitz/sdk').Project} */
	const project = {
		template: 'node',
		title: 'Compute maximum of array of objects using an accessor',
		description: 'An accessor retrieves and transforms a property.',
		files: {
			'index.html': index_html,
			'main.js': main_js,
			'max.js': max_js,
			'package.json': package_json
		}
	};

	/** @type {import('@stackblitz/sdk').EmbedOptions} */
	const embedOptions = {
		clickToLoad: true,
		openFile: 'max.js'
	};
</script>

<StackBlitz {project} {embedOptions} />
