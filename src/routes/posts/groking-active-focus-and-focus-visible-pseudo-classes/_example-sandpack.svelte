<script lang="ts">
  import SandpackExample from '$lib/components/sandpack-example.svelte';
  import index_html from './_example/index.html?raw';
  import styles_css from './_example/styles.css?raw';
  import sandbox_config_json from './_example/sandbox.config.json?raw';
  import package_json from './_example/package.json?raw';

  import type { SandboxInfo } from '@codesandbox/sandpack-client';

  const sandboxInfo: SandboxInfo = {
    files: {
      'index.html': {
        code: index_html,
      },
      'styles.css': {
        code: styles_css,
      },
      'package.json': {
        code: package_json,
      },
      'sandbox.config.json': {
        code: sandbox_config_json,
      },
    },
    dependencies: {},
    entry: 'index.html',
  };
</script>

<SandpackExample {sandboxInfo} />
