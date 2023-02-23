import ImgixClient from '@imgix/js-core';
import { IMGIX_DOMAIN, IMGIX_TOKEN } from '$env/static/private';

const client = new ImgixClient({
	domain: IMGIX_DOMAIN,
	secureURLToken: IMGIX_TOKEN,
	includeLibraryParam: false
});

// Open Props breakpoints.
const widths = [240, 360, 480, 768, 1024, 1440, 1920];

// imgix returns a modern image format if supported by browser.
const params = { auto: 'format' };

/**
 * Create `src` attribute for `<img />`.
 * Normally just uyse path to origin image.
 *
 * @param {string} path
 */
export const createSrc = function (path) {
	return client.buildURL(path, params);
};

/**
 * Create `srcset` attribute for `<img />`.
 * This is the cartesian product of widths and DPRs.
 *
 * @param {string} path
 */
export const createSrcset = function (path) {
	return client.buildSrcSet(path, params, {
		devicePixelRatios: [1, 2, 3],
		widths
	});
};
