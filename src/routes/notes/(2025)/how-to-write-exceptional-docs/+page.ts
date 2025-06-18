import type { PageLoad } from './$types';
import metadata from './meta.json';

export const load = (async () => {
	return {
		metadata
	};
}) satisfies PageLoad;
