import type { LayoutServerLoad } from './$types';
import { ORIGIN } from '$env/static/private';

// export const prerender = true;

export const load: LayoutServerLoad = async () => {
	return { origin: ORIGIN };
};
