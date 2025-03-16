import { test } from '@playwright/test';
import { DynamicContentPage } from '../../src/pages/DynamicContentPage.page';

/**
 * Тестова сьют для Dynamic Content Page
 */
test.describe('Dynamic Content Page', () => {
    let dynamicContentPage: DynamicContentPage;

    test.beforeEach(async ({ page }) => {
        dynamicContentPage = new DynamicContentPage(page);
    });

    /**
     * ✅ Тест: Гнучка перевірка кількості рядків контенту
     */
    test('should display 3 or 4 content rows', async () => {
        await test.step('Перейти на сторінку Dynamic Content', async () => {
            await dynamicContentPage.goto();
        });

        await test.step('Перевірити кількість рядків контенту (3 або 4)', async () => {
            await dynamicContentPage.expectContentRowsCountFlexible();
        });
    });

    /**
     * ✅ Тест: Контент змінюється після reload
     */
    test('should change content after reload', async () => {
        await test.step('Перейти на сторінку Dynamic Content', async () => {
            await dynamicContentPage.goto();
        });

        await test.step('Перевірити, що контент першого рядка змінюється після reload', async () => {
            await dynamicContentPage.expectContentChangesAfterReload(0);
        });
    });
});
