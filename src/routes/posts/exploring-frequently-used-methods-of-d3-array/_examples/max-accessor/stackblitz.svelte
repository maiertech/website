<script lang="ts">
  import StackBlitz from '$lib/components/stackblitz.svelte';

  import index_html from '../index.html?raw';
  import main_js from './main?raw';
  import max_js from './max?raw';
  import package_json from '../package.json?raw';

  import type { Project, EmbedOptions } from '@stackblitz/sdk';

  const project: Project = {
    template: 'node',
    title: 'Compute maximum of array of objects using an accessor',
    description: 'An accessor retrieves and transforms a property.',
    files: {
      'index.html': index_html,
      'main.js': main_js,
      'max.js': max_js,
      'package.json': package_json,
    },
  };

  const embedOptions: EmbedOptions = {
    // clickToLoad: true,
    openFile: 'max.js',
  };
</script>

<StackBlitz {project} {embedOptions} />
