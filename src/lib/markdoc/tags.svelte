<script context="module">
	// Importing from `@maiertech/sveltekit-helpers` will not work!
	// `svelte-markdoc-preprocess` needs access to tag component files to extract their properties via regex.
	export { default as Figure } from '../../../node_modules/@maiertech/sveltekit-helpers/dist/markdoc/tags/figure.svelte';
</script>
