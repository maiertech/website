<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async function ({ url, params, fetch }) {
    // Check if category is valid.
    const key = params.category;
    const path = `/categories/${key}.json`;
    const res = await fetch(path);

    if (!res.ok) {
      return {
        status: res.status,
        error: new Error(`Not found: ${url.pathname}.`),
      };
    }

    const { category, posts } = await res.json();

    if (posts.length === 0) {
      return {
        status: 404,
        error: new Error(`Not found: ${url.pathname}.`),
      };
    }

    return {
      props: { category, posts },
    };
  };
</script>

<script lang="ts">
  import type { PostMetadata } from '$lib/types/post-metadata.type';
  import type { Tag } from '$lib/types/tag.type';

  import SEO from '$lib/components/seo.svelte';
  import H1 from '$lib/components/h1.svelte';
  import Posts from '$lib/components/posts.svelte';

  export let category: Tag;
  export let posts: PostMetadata[];
</script>

<SEO title={`${category.title}`} description={category.description} />

<H1>{`${category.title}`}</H1>

<div class="mt-6 md:mt-12">
  <Posts {posts} />
</div>
