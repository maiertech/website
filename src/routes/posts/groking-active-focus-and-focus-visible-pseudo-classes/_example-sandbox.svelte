<script lang="ts">
  import SandboxExample from '$lib/components/sandbox-example.svelte';
  import index_html from './_example/index.html?raw';
  import styles_css from './_example/styles.css?raw';
  import sandbox_config_json from './_example/sandbox.config.json?raw';
  import package_json from './_example/package.json?raw';

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

<SandboxExample {files} />
