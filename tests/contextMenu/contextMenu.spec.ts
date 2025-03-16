import { test } from '@playwright/test';
import { ContextMenuPage } from '../../src/pages/ContextMenuPage.page';

/**
 * Тестова сьют для Context Menu
 */
test.describe('Context Menu Page', () => {
    let contextMenuPage: ContextMenuPage;

    test.beforeEach(async ({ page }) => {
        contextMenuPage = new ContextMenuPage(page);
    });

    /**
     * ✅ Тест: Виклик контекстного меню та перевірка alert-повідомлення
     */
    test('should display alert with context menu message', async () => {
        await test.step('Перейти на сторінку Context Menu', async () => {
            await contextMenuPage.goto();
        });

        await test.step('Встановити перевірку на alert з текстом', async () => {
            await contextMenuPage.expectAlertMessage('You selected a context menu');
        });

        await test.step('Викликати контекстне меню правим кліком', async () => {
            await contextMenuPage.triggerContextMenu();
        });
    });
});
