<script>
  import StackBlitz from '$lib/components/stackblitz.svelte';

  const project =
    'vitejs/vite/tree/main/packages/create-vite/template-svelte-ts';
  const embedOptions = { openFile: 'package.json' };
</script>

<StackBlitz {project} {embedOptions} />
