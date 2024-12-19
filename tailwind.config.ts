import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@maiertech/sveltekit-helpers/**/*.{js,svelte}'
	],

	theme: {
		fontFamily: {
			sans: ['Roboto', ...fontFamily.sans],
			serif: ['Spectral', ...fontFamily.serif]
		},
		extend: {
			// Extend colors, not override them.
			colors: {
				ink: 'var(--ink)',
				surface: 'var(--surface)',
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				accent: 'var(--accent)'
			}
		}
	},

	plugins: []
} satisfies Config;
