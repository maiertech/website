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

// Default image is original image.
export const createSrc = function (path: string) {
	return client.buildURL(path, params);
};

export const createSrcset = function (path: string) {
	return client.buildSrcSet(path, params, {
		devicePixelRatios: [1, 2, 3],
		widths
	});
};
