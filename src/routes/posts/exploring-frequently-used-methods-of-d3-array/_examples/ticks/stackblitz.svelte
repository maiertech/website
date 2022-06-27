<script lang="ts">
  import StackBlitz from '$lib/components/stackblitz.svelte';

  import index_html from '../index.html?raw';
  import main_js from './main?raw';
  import ticks_js from './ticks?raw';
  import package_json from '../package.json?raw';

  import type { Project, EmbedOptions } from '@stackblitz/sdk';

  const project: Project = {
    template: 'node',
    title: 'Compute ticks for different scenarios',
    description: 'Ticks makes sure you get nicely rounded numbers.',
    files: {
      'index.html': index_html,
      'main.js': main_js,
      'ticks.js': ticks_js,
      'package.json': package_json,
    },
  };

  const embedOptions: EmbedOptions = {
    // clickToLoad: true,
    openFile: 'ticks.js',
  };
</script>

<StackBlitz {project} {embedOptions} />
