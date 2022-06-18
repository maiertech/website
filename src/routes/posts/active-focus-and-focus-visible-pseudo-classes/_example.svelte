<script lang="ts">
  import Example from '$lib/components/example-codesandbox.svelte';
  import html from './_example/index.html?raw';
  import css from './_example/styles.css?raw';
</script>

<Example
  files={{
    'index.html': {
      content: html,
    },
    'styles.css': {
      content: css,
    },
  }}
/>
