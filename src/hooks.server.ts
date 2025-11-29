import { sequence } from '@sveltejs/kit/hooks';
import { createHandler, defaultOptions } from 'svelte-kit-bot-block';
import type { Handle } from '@sveltejs/kit';

// Block rogue bot traffic (WordPress scanners, vulnerability probing, etc.).
// Requests matching pathname patterns return 404, all other blocks return 410.
// Run with { log: true, block: false } first to test, then enable blocking.
const botBlock = createHandler({
	log: true,
	block: true,
	pathnames: [
		...defaultOptions.pathnames,
		// Block additional WordPress-related paths not covered by defaults.
		/\/wp-includes/
	]
});

// Preload web fonts.
const preloadFonts: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		preload: ({ type, path }) => {
			if (type === 'font') {
				return path.endsWith('.woff2');
			}
			return false;
		}
	});
	return response;
};

// Bot blocking should run first to reject bad requests early.
export const handle = sequence(botBlock, preloadFonts);
