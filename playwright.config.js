/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	webServer: {
		command: 'pnpm run build && pnpm run preview',
		port: 4173,
		reuseExistingServer: true
	},
	testDir: 'src/routes',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
