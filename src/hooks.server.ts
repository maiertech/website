import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Redirect apex domain to www subdomain.
	if (event.url.hostname === 'maier.tech') {
		const redirectUrl = new URL(event.url);
		redirectUrl.hostname = 'www.maier.tech';
		redirect(301, redirectUrl.toString());
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
