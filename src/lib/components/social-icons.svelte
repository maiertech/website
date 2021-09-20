<script lang="ts">
  import type { SocialIcon } from '$lib/types/social-icon.type';
  import TwitterLogo from './twitter-logo.svelte';
  import GitHubLogo from './github-logo.svelte';

  const socialIcons: SocialIcon[] = [
    {
      key: 'twitter',
      title: 'Twitter',
      href: 'https://twitter.com/maiertech',
      component: TwitterLogo,
    },
    {
      key: 'github',
      title: 'GitHub',
      href: 'https://github.com/maiertech',
      component: GitHubLogo,
    },
  ];
</script>

<div class="flex flex-wrap justify-center space-x-5">
  {#each socialIcons as icon (icon.key)}
    <a href={icon.href}>
      <span class="sr-only">{icon.title}</span>
      <svelte:component
        this={icon.component}
        class="h-7 w-7"
        aria-hidden={true}
      />
    </a>
  {/each}
</div>
