<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import links from '$lib/data/navigation';

  export const load: Load = function () {
    return { props: { links } };
  };
</script>

<script lang="ts">
  import Container from '$lib/components/container.svelte';
  import Logo from '$lib/components/logo.svelte';
</script>

<Container maxWidth="80rem">
  <header>
    <a href="/">
      <div class="logo"><Logo /></div>
      <div class="title">Thilo Maier</div>
    </a>
    <nav>
      {#each links as link (link.title)}
        <a href={link.href}>
          {link.title}
        </a>
      {/each}
    </nav>
  </header>
</Container>

<style>
  header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: var(--size-fluid-1);
    padding: var(--size-5) 0;
  }

  header > a {
    display: flex;
    align-items: center;
    gap: var(--size-fluid-1);
    text-decoration: none;
  }

  .logo {
    width: var(--size-fluid-4);
  }

  .title {
    font-size: var(--font-size-fluid-2);
    font-weight: 600;
  }

  nav {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    gap: var(--size-fluid-1);
  }

  nav > a {
    font-size: var(--font-size-fluid-1);
  }
  nav > a:hover {
    text-decoration: underline var(--link);
  }
</style>
