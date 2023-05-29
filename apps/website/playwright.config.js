/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	webServer: {
		command: 'turbo run build --filter=website && turbo run preview --filter=website',
		port: 4173,
		reuseExistingServer: true
	},
	testDir: 'src/routes',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
