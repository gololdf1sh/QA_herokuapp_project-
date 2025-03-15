import { test } from '@playwright/test';
import { DynamicContentPage } from '../../src/pages/DynamicContentPage.page';

test.describe('Dynamic Content', () => {
    let dynamicContentPage: DynamicContentPage;

    test.beforeEach(async ({ page }) => {
        dynamicContentPage = new DynamicContentPage(page);
        await dynamicContentPage.goto();
    });

    test('Контент змінюється при оновленні сторінки', async () => {
        const initialTexts = await dynamicContentPage.getTextsFromRows();

        await dynamicContentPage.refreshPage();

        const newTexts = await dynamicContentPage.getTextsFromRows();

        await dynamicContentPage.assertContentChanged(initialTexts, newTexts);
    });
});
