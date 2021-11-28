<script lang="ts">
  import SvelteSeo from 'svelte-seo';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { BASE_URL } from '$lib/data/urls';

  // Every page.
  export let title: string;
  export let description: string;
  export let canonicalUrl: string = null;

  // Articles.
  export let category: string = null;
  export let tags: string[] = null;
  export let published: string = null;
  export let modified: string = null;

  let decoratedTitle = title;
  if ($page.path !== `${base}/`) {
    decoratedTitle = `${title} – Thilo Maier`;
  }
  const url = canonicalUrl ?? `${BASE_URL}${$page.path}`;
</script>

<SvelteSeo
  title={decoratedTitle}
  {description}
  canonical={url}
  openGraph={{
    title,
    description,
    url,
    article: {
      publishedTime: published,
      modifiedTime: modified,
      section: category,
      tags,
    },
  }}
  twitter={{ title, description }}
/>
