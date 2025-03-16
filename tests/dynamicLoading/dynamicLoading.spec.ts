import { test } from '@playwright/test';
import { DynamicLoadingPage } from '../../src/pages/DynamicLoadingPage.page';

/**
 * Тестова сьют для Dynamic Loading Page
 */
test.describe('Dynamic Loading Page', () => {
    let dynamicLoadingPage: DynamicLoadingPage;

    test.beforeEach(async ({ page }) => {
        dynamicLoadingPage = new DynamicLoadingPage(page);
    });

    /**
     * ✅ Тест: Dynamic Loading Example 1
     */
    test('should load hidden element in Example 1', async () => {
        await test.step('Перейти на Dynamic Loading Example 1', async () => {
            await dynamicLoadingPage.goto(1);
        });

        await test.step('Натиснути Start та дочекатися контенту', async () => {
            await dynamicLoadingPage.clickStartAndWaitForContent(1);
        });

        await test.step('Перевірити текст завантаженого контенту', async () => {
            await dynamicLoadingPage.expectLoadedContentText('Hello World!');
        });
    });

    /**
     * ✅ Тест: Dynamic Loading Example 2
     */
    test('should render element after loading in Example 2', async () => {
        await test.step('Перейти на Dynamic Loading Example 2', async () => {
            await dynamicLoadingPage.goto(2);
        });

        await test.step('Натиснути Start та дочекатися контенту', async () => {
            await dynamicLoadingPage.clickStartAndWaitForContent(2);
        });

        await test.step('Перевірити текст завантаженого контенту', async () => {
            await dynamicLoadingPage.expectLoadedContentText('Hello World!');
        });
    });
});
