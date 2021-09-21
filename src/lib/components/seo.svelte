<script lang="ts">
  import SvelteSeo from 'svelte-seo';
  import { page } from '$app/stores';

  export let title = '';
  export let description: string;
  export let canonicalUrl = '';

  const pageUrl = `https://${$page.host}${$page.path}`;
</script>

<SvelteSeo {title} {description} canonical={canonicalUrl ?? pageUrl} />
