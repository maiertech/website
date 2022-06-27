<script lang="ts">
  import StackBlitz from '$lib/components/stackblitz.svelte';

  import index_html from '../index.html?raw';
  import main_js from './main?raw';
  import min_js from './min?raw';
  import package_json from '../package.json?raw';

  import type { Project, EmbedOptions } from '@stackblitz/sdk';

  const project: Project = {
    template: 'node',
    title: 'Compute minimum of array of numbers with missing values',
    description: 'Unlike Math.min, d3.min can handle missing values.',
    files: {
      'index.html': index_html,
      'main.js': main_js,
      'min.js': min_js,
      'package.json': package_json,
    },
  };

  const embedOptions: EmbedOptions = {
    // clickToLoad: true,
    openFile: 'min.js',
  };
</script>

<StackBlitz {project} {embedOptions} />
