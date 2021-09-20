import type { SvelteComponent } from 'svelte';

export type SocialIcon = {
  key: string;
  title: string;
  href: string;
  component: typeof SvelteComponent;
};
