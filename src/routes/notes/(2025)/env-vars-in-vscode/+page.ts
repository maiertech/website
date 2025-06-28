import type { PageLoad } from './$types';
import note from './meta';

export const load: PageLoad = async () => {
	const { title, description } = note;
	return {
		note,
		seo: { title, description }
	};
};
