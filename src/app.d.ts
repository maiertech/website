import type { NoteType, PostType } from '@maiertech/sveltekit-helpers';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			note?: NoteType;
			post?: PostType;
			seo?: {
				title: string;
				description: string;
				ogImageUrl?: string;
			};
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
