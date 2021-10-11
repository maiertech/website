<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async function ({ page, fetch }) {
    // Check if tag is permitted.
    const key = page.params.tag;
    const url = `/tags/${key}.json`;
    const res = await fetch(url);

    if (!res.ok) {
      return {
        status: res.status,
        error: new Error(`Not found: ${page.path}.`),
      };
    }

    const { tag, posts } = await res.json();

    if (posts.length === 0) {
      return {
        status: 404,
        error: new Error(`Not found: ${page.path}.`),
      };
    }

    return {
      props: { tag, posts },
    };
  };
</script>

<script lang="ts">
  import type { PostMetadata } from '$lib/types/post-metadata.type';
  import type { Tag } from '$lib/types/tag.type';

  import Posts from '$lib/components/posts.svelte';
  import H1 from '$lib/components/h1.svelte';
  import SEO from '$lib/components/seo.svelte';

  export let tag: Tag;
  export let posts: PostMetadata[];
</script>

<SEO
  title={`Posts about ${tag.label.toLowerCase()}`}
  description={tag.description}
/>

<H1>{tag.title}</H1>

<div class="mt-6 md:mt-12">
  <Posts {posts} />
</div>
