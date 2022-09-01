<script lang="ts">
  import StackBlitz from '$lib/components/stackblitz.svelte';
  import type { EmbedOptions, Project } from '@stackblitz/sdk';
  import index_html from '../index.html?raw';
  import package_json from '../package.json?raw';
  import extent_js from './extent?raw';
  import main_js from './main?raw';

  const project: Project = {
    template: 'node',
    title: 'Compute extent of an array of numbers',
    description:
      'The extent of a dataset is an array consisting of minimum and maximum.',
    files: {
      'index.html': index_html,
      'main.js': main_js,
      'extent.js': extent_js,
      'package.json': package_json,
    },
  };

  const embedOptions: EmbedOptions = {
    clickToLoad: true,
    openFile: 'extent.js',
  };
</script>

<StackBlitz {project} {embedOptions} />
