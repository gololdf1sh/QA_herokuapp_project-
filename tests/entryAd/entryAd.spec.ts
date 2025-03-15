import { test } from '@playwright/test';
import { EntryAdPage } from '../../src/pages/EntryAdPage.page';

test.describe('Entry Ad', () => {
    let entryAdPage: EntryAdPage;

    test.beforeEach(async ({ page }) => {
        entryAdPage = new EntryAdPage(page);
        await entryAdPage.goto();
    });

    test('Модалка зʼявляється при вході на сторінку', async () => {
        await entryAdPage.assertModalVisible(true);
    });

    test('Можна закрити модалку', async () => {
        await entryAdPage.closeModal();
        await entryAdPage.assertModalVisible(false);
    });

    test('Можна відкрити модалку повторно через Click Here', async () => {
        await entryAdPage.closeModal(); // Закриваємо модалку
        await entryAdPage.triggerModalAgain(); // Викликаємо повторно
        await entryAdPage.assertModalVisible(true); // Перевіряємо, що модалка знову з'явилась
    });
});
