import { test } from '@playwright/test';
import { DigestAuthPage } from '../../src/pages/DigestAuthPage.page';
import { users } from '../../src/fixtures/users';

/**
 * Тестова сьют для Digest Auth Page
 */
test.describe('Digest Auth Page', () => {
    let digestAuthPage: DigestAuthPage;

    test.beforeEach(async ({ page }) => {
        digestAuthPage = new DigestAuthPage(page);
    });

    /**
     * ✅ Позитивний тест: успішна авторизація
     */
    test('should authenticate successfully with valid credentials', async () => {
        await test.step('Перейти на Digest Auth сторінку з валідними даними', async () => {
            await digestAuthPage.goto(users.digestAuth.username, users.digestAuth.password);
        });

        await test.step('Перевірити повідомлення про успішну авторизацію', async () => {
            await digestAuthPage.expectSuccessMessage();
        });
    });

    /**
     * ❌ Негативний тест: неуспішна авторизація
     */
    test('should not authenticate with invalid credentials', async () => {
        await test.step('Перевірити статус відповіді при неправильних даних (401 Unauthorized)', async () => {
            await digestAuthPage.expectUnauthorized(users.invalidAdmin.username, users.invalidAdmin.password);
        });
    });
});
