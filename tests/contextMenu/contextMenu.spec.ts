import { test, expect } from '@playwright/test';
import { ContextMenuPage } from '../../src/pages/contextMenuPage.page';

// Група тестів для Context Menu
test.describe('Context Menu', () => {

    test('Right-click triggers alert with correct text', async ({ page }) => {
        const contextMenuPage = new ContextMenuPage(page);

        // Переходимо на сторінку
        await contextMenuPage.goto();

        // Підписуємося на подію "dialog" до того, як викликати клік
        page.once('dialog', async (dialog) => {
            console.log(`Отримано alert з текстом: "${dialog.message()}"`);

            // Перевіряємо текст у діалозі
            expect(dialog.message()).toBe('You selected a context menu');

            // Приймаємо alert
            await dialog.accept();
        });

        // Викликаємо контекстне меню на елементі
        await contextMenuPage.rightClickHotSpot();

        // Додаткова перевірка видимості елементу (не обов'язкова)
        await expect(contextMenuPage.hotSpot).toBeVisible();

        // Можна додати паузу для дебагу (закоментувати після перевірки)
        // await page.pause();
    });

});
