<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async function ({ page, fetch }) {
    // Check if category is permitted.
    const key = page.params.category;
    const url = `/categories/${key}.json`;
    const res = await fetch(url);

    if (!res.ok) {
      return {
        status: res.status,
        error: new Error(`Category '${key}' is not a permitted category.`),
      };
    }

    const { category, posts } = await res.json();

    if (posts.length === 0) {
      return {
        status: 404,
        error: new Error(`There are no posts in category '${key}'.`),
      };
    }

    return {
      props: { category, posts },
    };
  };
</script>

<script>
  export let category;
  export let posts;
</script>

<h1>{category.title}</h1>

<pre>{JSON.stringify(posts, null, 2)}</pre>
