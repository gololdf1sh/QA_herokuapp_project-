import { test } from '@playwright/test';
import { EntryAdPage } from '../../src/pages/EntryAdPage.page';

/**
 * Тестова сьют для Entry Ad Page
 */
test.describe('Entry Ad Page', () => {
    let entryAdPage: EntryAdPage;

    test.beforeEach(async ({ page }) => {
        entryAdPage = new EntryAdPage(page);
    });

    /**
     * ✅ Тест: Модалка відображається при завантаженні сторінки
     */
    test('should display modal on page load', async () => {
        await test.step('Перейти на сторінку Entry Ad', async () => {
            await entryAdPage.goto();
        });

        await test.step('Перевірити, що модальне вікно відображається', async () => {
            await entryAdPage.expectModalVisible();
        });
    });

    /**
     * ✅ Тест: Можна закрити модальне вікно
     */
    test('should close modal window', async () => {
        await test.step('Перейти на сторінку Entry Ad', async () => {
            await entryAdPage.goto();
        });

        await test.step('Закрити модальне вікно', async () => {
            await entryAdPage.closeModal();
        });
    });

    /**
     * ✅ Тест: Можна знову відкрити модальне вікно
     */
    test('should re-enable modal window', async () => {
        await test.step('Перейти на сторінку Entry Ad', async () => {
            await entryAdPage.goto();
        });

        await test.step('Закрити модальне вікно', async () => {
            await entryAdPage.closeModal();
        });

        await test.step('Заново показати модальне вікно', async () => {
            await entryAdPage.reEnableModal();
        });
    });
});
