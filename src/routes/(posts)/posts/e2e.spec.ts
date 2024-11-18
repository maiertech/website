import { expect, test } from '@playwright/test';

test.describe('post routes', () => {
	test('/how-to-add-a-basic-seo-component-to-sveltekit', async ({ page }) => {
		await page.goto('/posts/how-to-add-a-basic-seo-component-to-sveltekit');

		// Check SEO data.
		const title = 'How to add a basic SEO component to SvelteKit – Thilo Maier';
		const url = 'https://maier.tech/posts/how-to-add-a-basic-seo-component-to-sveltekit';

		await expect(page).toHaveTitle(title);
		await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);

		await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');

		await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', url);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', url);
	});

	test('/posts/husky-v6-pitfalls', async ({ page }) => {
		await page.goto('/posts/husky-v6-pitfalls');
		await expect(page.locator('h1')).toHaveText('404');
	});
});
