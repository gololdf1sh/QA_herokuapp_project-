import { test, expect } from '@playwright/test';
import { DigestAuthPage } from '../../src/pages/digestAuthPage.page';

test.describe('Digest Authentication Page', () => {

    test('Успішний доступ через Digest Auth', async ({ browser }) => {

        const context = await browser.newContext({
            httpCredentials: {
                username: 'admin',
                password: 'admin'
            }
        });

        const page = await context.newPage();
        const digestAuthPage = new DigestAuthPage(page);

        await digestAuthPage.navigate();

        const message = await digestAuthPage.getSuccessMessage();

        // Перевіряємо саме повідомлення в абзаці <p>
        expect(message).toContain('Congratulations! You must have the proper credentials.');

        await context.close();
    });
});
