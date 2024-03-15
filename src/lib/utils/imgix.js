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
 * Get `src` attribute for `<img >` tag.
 * Normally just use path to origin image.
 * @param {string} path - Path to origin image.
 * @returns {string} - `src` with URL to imgix CDN.
 */
export function get_src(path) {
	return client.buildURL(path, params);
}

/**
 * Get `srcset` attribute for `<img>` tag.
 * This is the cartesian product of widths and DPRs.
 * @param {string} path - Path to origin image.
 * @returns {string} - `srcset` with URLs to imgix CDN.
 */
export const get_srcset = function (path) {
	return client.buildSrcSet(path, params, {
		devicePixelRatios: [1, 2, 3],
		widths
	});
};
