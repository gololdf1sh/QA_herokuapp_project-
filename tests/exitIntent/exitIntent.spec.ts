import { test } from '@playwright/test';
import { ExitIntentPage } from '../../src/pages/ExitIntentPage.page';

test.describe('Exit Intent Page', () => {
    let exitIntentPage: ExitIntentPage;

    test.beforeEach(async ({ page }) => {
        exitIntentPage = new ExitIntentPage(page);

        await test.step('Відкрити сторінку Exit Intent', async () => {
            await exitIntentPage.goto();
        });
    });

    test('Модальне зʼявляється при спробі покинути сторінку', async () => {
        await test.step('Тригеримо Exit Intent', async () => {
            await exitIntentPage.triggerExitIntent();
        });

        await test.step('Перевіряємо, що модальне зʼявилось', async () => {
            await exitIntentPage.assertModalVisible(true);
        });
    });

    test('Можна закрити модальне вікно після появи', async () => {
        await test.step('Тригеримо Exit Intent', async () => {
            await exitIntentPage.triggerExitIntent();
        });

        await test.step('Закриваємо модальне вікно', async () => {
            await exitIntentPage.closeModal();
        });

        await test.step('Перевіряємо, що модальне зникло', async () => {
            await exitIntentPage.assertModalVisible(false);
        });
    });
});
