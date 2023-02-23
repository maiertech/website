<script>
	import CodeSandboxEmbed from './csb-embed.svelte';
	import index_html from './index.html?raw';
	import package_json from './package.json?raw';
	import sandbox_config_json from './sandbox.config.json?raw';
	import styles_css from './styles.css?raw';

	/** @type {import('./types').Files} */
	const files = {
		'index.html': {
			content: index_html
		},
		'styles.css': {
			content: styles_css
		},
		'package.json': {
			content: package_json
		},
		'sandbox.config.json': {
			content: sandbox_config_json
		}
	};
</script>

<CodeSandboxEmbed {files} />
