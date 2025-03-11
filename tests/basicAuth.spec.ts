import { test, expect, Browser } from '@playwright/test'; // Імпортуємо test-раннер та expect
import { BasicAuthPage } from '../pages/BasicAuthPage.page'; // Імпортуємо Page Object для Basic Auth сторінки
import * as allure from 'allure-js-commons'; // Для генерації звітів Allure

/**
 * ✅ Група тестів для Basic Authentication
 */
test.describe('Basic Auth Tests', () => {

    /**
     * ✅ Тест-кейс: Успішний вхід через Basic Auth
     * Мета:
     * - Перевірити успішний доступ до захищеної сторінки при використанні правильних логіна та пароля.
     * Критерії прийняття:
     * - Сторінка підтверджує успішну авторизацію через повідомлення "Congratulations!"
     */
    test('Успішний вхід через Basic Auth', async ({ browser }) => {

        // ➡️ Додаємо мета-дані для структурування звіту в Allure
        await allure.epic('Authentication');
        await allure.feature('Basic Auth');
        await allure.story('Valid credentials');
        await allure.severity('critical');

        /**
         * Step 1: Створення нового контексту браузера з httpCredentials
         * Best Practice:
         * - Використовуємо `browser.newContext` із `httpCredentials` для базової авторизації.
         * - Це дозволяє уникнути ручного введення логіна/пароля у вікні браузера.
         */
        const context = await browser.newContext({
            httpCredentials: {
                username: 'admin',
                password: 'admin'
            }
        });

        // Відкриваємо нову сторінку в створеному контексті
        const page = await context.newPage();

        // Ініціалізуємо Page Object для Basic Auth сторінки
        const basicAuthPage = new BasicAuthPage(page, context);

        /**
         * Step 2: Переходимо на захищену сторінку
         * Очікування:
         * - Сторінка відображає контент, доступний тільки після авторизації
         */
        await allure.step('Перейти на сторінку Basic Auth', async () => {
            await basicAuthPage.goto(); // Метод переходу на сторінку в Page Object
        });

        /**
         * Step 3: Перевіряємо, що доступ надано
         * Очікування:
         * - На сторінці з'являється повідомлення "Congratulations!"
         */
        await allure.step('Перевірити, що вхід успішний', async () => {

            // Отримуємо текст повідомлення про успіх
            const message = await basicAuthPage.getSuccessMessageText();

            // Використовуємо expect для перевірки
            expect(message).toContain('Congratulations!');

            // Додаємо скріншот до звіту для візуального підтвердження
            const screenshot = await page.screenshot();
            await allure.attachment('Basic Auth Success Screenshot', screenshot, 'image/png');
        });

        // Закриваємо контекст після виконання тесту
        await context.close();
    });

});
