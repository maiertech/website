<script lang="ts">
  import CodeSandbox from '$lib/components/codesandbox.svelte';

  // Import files for example as raw text.
  import index_html from './index.html?raw';
  import styles_css from './styles.css?raw';
  import package_json from './package.json?raw';
  import sandbox_config_json from './sandbox.config.json?raw';

  import type { Files } from '$models/codesandbox.model';

  const files: Files = {
    'index.html': {
      content: index_html,
    },
    'styles.css': {
      content: styles_css,
    },
    'package.json': {
      content: package_json,
    },
    'sandbox.config.json': {
      content: sandbox_config_json,
    },
  };
</script>

<CodeSandbox {files} />
