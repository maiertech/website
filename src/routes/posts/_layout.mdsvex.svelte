<script context="module">
  import { h1, p, table, td, th } from '$lib/elements';
  export { h1, p, table, td, th };
</script>

<script>
  // We cannot use TypeScript in mdsvex layout files, but we can import a TypeScript layout file:
  // https://github.com/pngwn/MDsveX/issues/116
  import Layout from './_layout.svelte';
</script>

<Layout {...$$restProps}>
  <slot />
</Layout>
