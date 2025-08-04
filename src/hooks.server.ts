import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
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
