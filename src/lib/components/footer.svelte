<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import links from '$lib/data/navigation';

  // Read navigation links.
  export const load: Load = function () {
    return { props: { links } };
  };
</script>

<script>
  import Container from '$lib/components/container.svelte';
  import SocialIcons from '$lib/components/social-icons.svelte';
</script>

<footer class="bg-text-lighter text-background">
  <Container>
    <div class="space-y-6 py-8">
      <nav class="flex flex-wrap justify-center" aria-label="Footer">
        {#each links as link (link.title)}
          <div class="py-2 px-5">
            <a href={link.href} class="text-base">{link.title}</a>
          </div>
        {/each}
      </nav>
      <SocialIcons />
      <p class="text-center text-base">&copy; 2021 Thilo Maier</p>
    </div>
  </Container>
</footer>
