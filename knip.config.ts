import type { KnipConfig } from 'knip';

const mdsvexCompiler = (source: string) => {
	// Ignore fenced examples because mdsvex does not execute their script tags.
	const withoutCodeFences = source.replace(
		/^ {0,3}(`{3,}|~{3,})[^\n]*\n[\s\S]*?^ {0,3}\1\s*$/gm,
		''
	);

	return [...withoutCodeFences.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
		.map(([, script]) => script)
		.join('\n');
};

const config = {
	// These files are not all statically traceable through Vite and mdsvex configuration.
	entry: ['content-collections.ts', 'src/lib/mdsvex/layouts/default.svelte', 'src/routes/**/*.md'],
	project: ['*.{js,ts}', 'src/**/*.{js,ts,svelte,md,css}'],
	compilers: {
		md: mdsvexCompiler
	},
	treatConfigHintsAsErrors: true
} satisfies KnipConfig;

export default config;
