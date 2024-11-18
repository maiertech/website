import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},

	testDir: 'src/routes',
	testMatch: 'src/routes/**/*.spec.ts'
});
