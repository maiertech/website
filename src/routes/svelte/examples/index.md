---
title: Svelte examples
description: A collection of instructive Svelte examples.
---

<script context="module">
  export const prerender = true;

  export const load = async function ({ url, fetch }) {
    const res = await fetch('/svelte/examples.json');

    if (!res.ok) {
      return {
        status: res.status,
        error: new Error(`Not found: ${url.pathname}.`),
      };
    }

    const { examples } = await res.json();

    if (examples.length === 0) {
      return {
        status: 404,
        error: new Error(`Not found: ${url.pathname}.`),
      };
    }

    return {
      props: { examples },
    };
  };
</script>

<script>
  import Examples from '$lib/components/examples.svelte';

  export let examples;
</script>

With [Svelte REPL](https://svelte.dev/repl) you can share and explore Svelte
code without having to spin up a local development environment. Whenever I come
across a REPL from which I learned a ton, I add it here.

<Examples {examples} />
