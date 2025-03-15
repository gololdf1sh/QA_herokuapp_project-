import { test, expect } from '@playwright/test';
import { DynamicLoadingPage } from '../../src/pages/DynamicLoadingPage.page';

test.describe('Dynamic Loading Page', () => {
    let dynamicLoadingPage: DynamicLoadingPage;

    test.beforeEach(async ({ page }) => {
        dynamicLoadingPage = new DynamicLoadingPage(page);
        await dynamicLoadingPage.goto();
    });

    test('Example 1: Контент зʼявляється після натискання кнопки', async () => {
        await dynamicLoadingPage.goToExample(1);

        await dynamicLoadingPage.startLoading();
        await dynamicLoadingPage.waitForLoadingToFinish();
        await dynamicLoadingPage.assertLoadedText('Hello World!');
    });

    test('Example 2: Контент рендериться асинхронно', async () => {
        await dynamicLoadingPage.goToExample(2);

        await dynamicLoadingPage.startLoading();
        await dynamicLoadingPage.waitForLoadingToFinish();
        await dynamicLoadingPage.assertLoadedText('Hello World!');
    });
});
