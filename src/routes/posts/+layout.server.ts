import type { LayoutServerLoad } from './$types';
import { ORIGIN } from '$env/static/private';

// TODO: Enable prerendering once all content collections are in place.
export const prerender = false;

export const load: LayoutServerLoad = async () => {
	return { origin: ORIGIN };
};
