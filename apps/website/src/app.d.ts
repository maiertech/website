/// <reference types="@sveltejs/kit" />
import { SeoData } from '$lib/types';

declare namespace App {
	// interface Error {}
	// interface Locals {}
	interface PageData {
		seo: SeoData;
	}
	// interface Platform {}
}
