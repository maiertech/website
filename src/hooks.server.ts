import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

// Permanent redirects.
const redirects: Record<string, string> = {
	'/notes/a-lockfile-for-agentic-skills': '/notes/a-lockfile-for-agent-skills'
};

export const handle: Handle = async ({ event, resolve }) => {
	// Handle permanent redirects.
	const redirectTarget = redirects[event.url.pathname];
	if (redirectTarget) {
		redirect(301, redirectTarget);
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
