<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

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
        error: new Error(`Could not fetch ${url}`),
      };
    }
  };
</script>

<script lang="ts">
  import type PostFrontmatter from '$lib/types/post-frontmatter.type';
  export let posts: PostFrontmatter[];
</script>

<h1>Posts</h1>

<ul>
  {#each posts as post}
    <li><pre>{JSON.stringify(post, null, 2)}</pre></li>
  {/each}
</ul>
