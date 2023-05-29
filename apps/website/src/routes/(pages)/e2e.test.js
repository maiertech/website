import { expect, test } from '@playwright/test';

test.describe('homepage', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('SEO data', async ({ page }) => {
		await expect(page).toHaveTitle('Thilo Maier');
		await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
			'content',
			'Thilo Maier'
		);
		await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
			'content',
			'https://maier.tech/'
		);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			'href',
			'https://maier.tech/'
		);
	});
});
