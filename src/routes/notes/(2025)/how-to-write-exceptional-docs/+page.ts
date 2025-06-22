import type { PageLoad } from './$types';
import note from './meta.json';

export const load: PageLoad = async () => {
	return {
		note
	};
};
