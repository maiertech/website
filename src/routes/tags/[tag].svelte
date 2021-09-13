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
        error: new Error(`Tag '${key}' is not a permitted tag.`),
      };
    }

    // Read resolved tag.
    const { tag, posts } = await res.json();

    if (posts.length === 0) {
      return {
        status: 404,
        error: new Error(`There are no posts tagged with '${key}'.`),
      };
    }

    return {
      props: { tag, posts },
    };
  };
</script>

<script>
  export let tag;
  export let posts;
</script>

<h1>{tag.title}</h1>

<pre>{JSON.stringify(posts, null, 2)}</pre>
