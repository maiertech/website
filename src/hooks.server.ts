import type { Handle } from '@sveltejs/kit';

// File extensions that are never valid on this SvelteKit site. Requests for these are rogue.
const BLOCKED_EXTENSIONS = ['.php', '.asp', '.aspx', '.cgi'];

// Path prefixes associated with WordPress that are never valid on this site.
const BLOCKED_PATH_PREFIXES = ['/wp-admin', '/wp-includes', '/wp-content', '/wp-login'];

function isRogueRequest(pathname: string): boolean {
	if (BLOCKED_EXTENSIONS.some((ext) => pathname.endsWith(ext))) {
		return true;
	}
	if (BLOCKED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
		return true;
	}
	return false;
}

export const handle: Handle = async ({ event, resolve }) => {
	// Return 410 Gone for rogue requests so well-behaved bots stop retrying.
	if (isRogueRequest(event.url.pathname)) {
		return new Response(null, { status: 410 });
	}

	// Preload web fonts.
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
