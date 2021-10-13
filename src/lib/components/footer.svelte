<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import links from '$lib/data/navigation';

  // Read navigation links.
  export const load: Load = function () {
    return { props: { links } };
  };
</script>

<script lang="ts">
  import type { SocialIcon } from '$lib/types/social-icon.type';
  import Container from '$lib/components/container.svelte';
  import SocialIcons from '$lib/components/social-icons.svelte';
  import TwitterLogo from './twitter-logo.svelte';
  import GitHubLogo from './github-logo.svelte';
  import * as Fathom from 'fathom-client';

  const icons: SocialIcon[] = [
    {
      key: 'twitter',
      title: 'Twitter',
      href: 'https://twitter.com/maiertech',
      component: TwitterLogo,
      onclick: () => {
        Fathom.trackGoal('2I6NRT6B', 0);
      },
    },
    {
      key: 'github',
      title: 'GitHub',
      href: 'https://github.com/maiertech',
      component: GitHubLogo,
    },
  ];
</script>

<footer class="bg-text-lighter text-background">
  <Container>
    <div class="space-y-6 py-8">
      <nav class="flex flex-wrap justify-center" aria-label="Footer">
        {#each links as link (link.title)}
          <div class="py-2 px-5">
            <a
              href={link.href}
              class="text-base"
              on:click={() => console.log('LINK')}>{link.title}</a
            >
          </div>
        {/each}
      </nav>
      <SocialIcons {icons} />
      <p class="text-center text-base">&copy; 2021 Thilo Maier</p>
    </div>
  </Container>
</footer>
