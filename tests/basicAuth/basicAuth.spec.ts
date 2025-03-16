import { test } from '@playwright/test';
import { BasicAuthPage } from '../../src/pages/BasicAuthPage.page';
import { users } from '../../src/fixtures/users';

/**
 * Тестова сьют для Basic Auth
 */
test.describe('Basic Auth Page', () => {
    let basicAuthPage: BasicAuthPage;

    test.beforeEach(async ({ page }) => {
        basicAuthPage = new BasicAuthPage(page);
    });

    /**
     * ✅ Позитивний тест: успішна авторизація
     */
    test('should authenticate successfully with valid credentials', async () => {
        await test.step('Перейти на Basic Auth сторінку з валідними даними', async () => {
            await basicAuthPage.goto(users.basicAuth.username, users.basicAuth.password);
        });

        await test.step('Перевірити повідомлення про успішну авторизацію', async () => {
            await basicAuthPage.expectSuccessMessage();
        });
    });

    /**
     * ❌ Негативний тест: неуспішна авторизація
     */
    test('should not authenticate with invalid credentials', async () => {
        await test.step('Перевірити статус відповіді при неправильних даних (401 Unauthorized)', async () => {
            await basicAuthPage.expectUnauthorized(users.invalidAdmin.username, users.invalidAdmin.password);
        });
    });
});
