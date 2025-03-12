import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { BasicAuthPage } from '../../src/pages/BasicAuthPage.page';
import { createAuthContext } from '../../src/utils/browserUtils';
import { users } from '../../src/fixtures/users';

/**
 * Тестова сьют для перевірки Basic Authentication
 */
test.describe('Basic Auth Tests', () => {

    /**
     * ✅ Позитивний тест-кейс: Успішна авторизація
     */
    test('Успішний вхід через Basic Auth', async ({ browser }) => {
        await allure.epic('Authentication');
        await allure.feature('Basic Auth');
        await allure.story('Valid credentials');
        await allure.severity('critical');

        // Створюємо контекст браузера з валідними даними
        const context = await createAuthContext(browser, users.validAdmin.username, users.validAdmin.password);
        const page = await context.newPage();
        const basicAuthPage = new BasicAuthPage(page);

        await basicAuthPage.goto();

        // Перевіряємо, що з'явилось повідомлення про успішний вхід
        await allure.step('Перевірити, що вхід успішний', async () => {
            const message = await basicAuthPage.getSuccessMessageText();
            expect(message).toContain('Congratulations!');
        });

        await context.close();
    });

    /**
     * ❌ Негативний тест-кейс: Невірний логін або пароль
     */
    test('Негативний сценарій: Невірний логін або пароль', async ({ browser }) => {
        await allure.epic('Authentication');
        await allure.feature('Basic Auth');
        await allure.story('Invalid credentials');
        await allure.severity('critical');

        // Створюємо контекст браузера з неправильними даними
        const context = await createAuthContext(browser, users.invalidAdmin.username, users.invalidAdmin.password);
        const page = await context.newPage();
        const basicAuthPage = new BasicAuthPage(page);

        await basicAuthPage.goto();

        // Перевіряємо, що з'явилось повідомлення про відмову в доступі
        await allure.step('Перевірити, що доступ заборонено', async () => {
            const errorMessage = await basicAuthPage.getErrorMessageText();
            expect(errorMessage).toContain('Not authorized');
        });

        await context.close();
    });
});
