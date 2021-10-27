<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const prerender = true;

  export const load: Load = async function ({ fetch }) {
    const url = '/posts.json';
    const res = await fetch(url);

    if (res.ok) {
      const { posts } = await res.json();
      return {
        props: { posts },
      };
    } else {
      return {
        status: 500,
        error: new Error(`Could not fetch ${url}.`),
      };
    }
  };
</script>

<script lang="ts">
  import type { PostMetadata } from '$lib/types/post-metadata.type';

  import H1 from '$lib/components/h1.svelte';
  import SEO from '$lib/components/seo.svelte';
  import Posts from '$lib/components/posts.svelte';

  export let posts: PostMetadata[];
</script>

<H1>Posts</H1>

<SEO title="Posts" description="Overview of post categories." />

<div class="mt-6 md:mt-12">
  <Posts {posts} />
</div>
