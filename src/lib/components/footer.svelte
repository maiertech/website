<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import links from '$lib/data/navigation';

  export const load: Load = function () {
    return { props: { links } };
  };
</script>

<script lang="ts">
  import Container from '$lib/components/container.svelte';
  import SocialIcons from '$lib/components/social-icons.svelte';
  import TwitterLogo from './twitter-logo.svelte';
  import GitHubLogo from './github-logo.svelte';
  import * as Fathom from 'fathom-client';

  import type { SocialIcon } from '$models/content.model';

  const icons: SocialIcon[] = [
    {
      id: 'twitter',
      title: 'Twitter',
      href: 'https://twitter.com/maiertech',
      component: TwitterLogo,
      onclick: () => {
        Fathom.trackGoal('2I6NRT6B', 0);
      },
    },
    {
      id: 'github',
      title: 'GitHub',
      href: 'https://github.com/maiertech',
      component: GitHubLogo,
    },
  ];
</script>

<footer>
  <Container>
    <nav aria-label="Footer">
      {#each links as link (link.title)}
        <a href={link.href}>{link.title}</a>
      {/each}
    </nav>
    <div class="center">
      <SocialIcons {icons} />
      <p>&copy; 2022 Thilo Maier</p>
    </div>
  </Container>
</footer>

<style>
  footer {
    background: var(--surface-2);
    padding-block: var(--size-fluid-3);
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: var(--size-fluid-3);
  }

  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--size-fluid-2);
  }
</style>
