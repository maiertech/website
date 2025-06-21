import { PUBLIC_URL_ORIGIN } from '$env/static/public';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ url }) => {
	// Make `urlOrigin` for `ResponsiveImage` component available to support prerendering.
	const urlOrigin = PUBLIC_URL_ORIGIN || url.origin;
	return { urlOrigin };
};
