import { test, expect } from '@playwright/test';
import { MultipleWindowsPage } from '../../src/pages/MultipleWindowsPage.page';

test.describe('Multiple Windows', () => {
    let multipleWindowsPage: MultipleWindowsPage;

    test.beforeEach(async ({ page }) => {
        multipleWindowsPage = new MultipleWindowsPage(page);
        await multipleWindowsPage.goto();
    });

    test('Користувач може відкрити нову вкладку і побачити контент', async () => {
        // Відкриваємо нову вкладку
        const newPage = await multipleWindowsPage.openNewWindow();

        // Чекаємо завантаження
        await newPage.waitForLoadState();

        // Перевіряємо контент нової вкладки
        const heading = newPage.locator('h3');
        await expect(heading).toHaveText('New Window');

        // Повертаємося назад до головного вікна
        await multipleWindowsPage.page.bringToFront();

        // Перевіряємо, що на головній вкладці правильний заголовок
        const mainHeading = multipleWindowsPage.page.locator('h3');
        await expect(mainHeading).toHaveText('Opening a new window');
    });
});
