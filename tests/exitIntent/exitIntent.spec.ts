import { test } from '@playwright/test';
import { ExitIntentPage } from '../../src/pages/ExitIntentPage.page';

test.describe('Exit Intent', () => {
    let exitIntentPage: ExitIntentPage;

    test.beforeEach(async ({ page }) => {
        exitIntentPage = new ExitIntentPage(page);
        await exitIntentPage.goto();
    });

    test('Модалка зʼявляється при спробі покинути сторінку', async () => {
        await exitIntentPage.triggerExitIntent();
        await exitIntentPage.assertModalVisible(true);
    });

    test('Можна закрити модалку після появи', async () => {
        await exitIntentPage.triggerExitIntent();
        await exitIntentPage.closeModal();
        await exitIntentPage.assertModalVisible(false);
    });
});
