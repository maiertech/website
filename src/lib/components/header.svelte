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

<header aria-label="Top">
  <Container>
    <nav class="flex items-center justify-between py-6">
      <div class="flex items-center space-x-3">
        <a href="/" class="text-primary-default hover:text-primary-lighter">
          <Logo class="h-8 sm:h-9 md:h-10 lg:h-12" />
        </a>
        <div class="text-xl">Thilo Maier</div>
      </div>
      <div class="space-x-5">
        {#each links as link (link.title)}
          <a
            href={link.href}
            class="text-base font-medium hover:text-text-lighter"
          >
            {link.title}
          </a>
        {/each}
      </div>
    </nav>
  </Container>
</header>
