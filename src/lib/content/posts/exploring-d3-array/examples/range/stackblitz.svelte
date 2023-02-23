<script lang="ts">
	import StackBlitz from '$lib/components/stackblitz.svelte';
	import type { EmbedOptions, Project } from '@stackblitz/sdk';
	import index_html from '../index.html?raw';
	import package_json from '../package.json?raw';
	import main_js from './main?raw';
	import range_js from './range?raw';

	const project: Project = {
		template: 'node',
		title: 'Compute range for different scenarios',
		description: 'Range returns an array of evenly spaced numbers.',
		files: {
			'index.html': index_html,
			'main.js': main_js,
			'range.js': range_js,
			'package.json': package_json
		}
	};

	const embedOptions: EmbedOptions = {
		clickToLoad: true,
		openFile: 'range.js'
	};
</script>

<StackBlitz {project} {embedOptions} />
