import type { NoteMeta, Post } from '@maiertech/sveltekit-helpers';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			note?: NoteMeta;
			post?: Post;
			seo?: {
				title: string;
				description: string;
				ogImageUrl?: string;
			};
		}
		// interface PageState {}
		// interface Platform {}
	}

	// Defined in vite.config.ts. Set only for builds that serve assets from a CDN.
	const __CDN_HOST__: string | null;
}

export {};
