<script>
  import StackBlitz from '$lib/components/stackblitz.svelte';

  const project = 'vitejs/vite/tree/main/packages/create-vite/template-svelte';
  const embedOptions = { openFile: 'src/App.svelte' };
</script>

<StackBlitz {project} {embedOptions} />
