import ImgixClient from '@imgix/js-core';

console.log(`Domain: ${process.env.IMGIX_DOMAIN}`);

const client = new ImgixClient({
  // Default value ensures that GitHub actions build does not fail.
  domain: process.env.IMGIX_DOMAIN || 'example.imgix.net',
  // This token is a secret and needs to be protected.
  secureURLToken: process.env.IMGIX_TOKEN,
  includeLibraryParam: false,
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
    widths,
  });
};
