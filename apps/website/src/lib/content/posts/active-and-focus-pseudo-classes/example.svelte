<script>
	import StackBlitzEmbed from '$lib/components/stackblitz-embed.svelte';
	import index_html from './index.html?raw';

	/** @type {import('@stackblitz/sdk').Project} */
	const project = {
		template: 'html',
		title: 'Groking :active, :focus and :focus-visible pseudo-classes',
		description: 'Try out what you learn in this post.',
		files: {
			'index.html': index_html
		}
	};

	/** @type {import('@stackblitz/sdk').EmbedOptions} */
	const options = { view: 'preview' };
</script>

<StackBlitzEmbed {project} {options} />
