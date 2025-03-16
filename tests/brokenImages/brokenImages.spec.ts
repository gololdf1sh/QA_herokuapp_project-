import { test } from '@playwright/test';
import { BrokenImagesPage } from '../../src/pages/BrokenImagesPage.page';

/**
 * Тестова сьют для сторінки Broken Images
 */
test.describe('Broken Images Page', () => {
    let brokenImagesPage: BrokenImagesPage;

    test.beforeEach(async ({ page }) => {
        brokenImagesPage = new BrokenImagesPage(page);
    });

    /**
     * ✅ Тест: Перевірка наявності зламаних зображень
     */
    test('should detect broken images on the page', async () => {
        await test.step('Перейти на сторінку Broken Images', async () => {
            await brokenImagesPage.goto();
        });

        await test.step('Перевірити кількість зламаних зображень', async () => {
            await brokenImagesPage.expectBrokenImages(2); // 🔧 Тут вкажи очікувану кількість зламаних зображень
        });
    });
});
