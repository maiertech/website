const autoprefixer = require('autoprefixer');
const postcss_jit_props = require('postcss-jit-props');
const OpenProps = require('open-props');

module.exports = {
	plugins: [postcss_jit_props(OpenProps), autoprefixer]
};
