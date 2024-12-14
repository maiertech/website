import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@maiertech/sveltekit-helpers/**/*.{js,svelte}'
	],

	theme: {
		extend: {
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
