import {test, expect} from '@playwright/test'; // Імпортуємо test-раннер та expect
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
    test('Успішний вхід через Basic Auth', async ({  browser }) => {

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
        const basicAuthPage = new BasicAuthPage(page);

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

    test('Негативний сценарій: Невірний логін або пароль', async ({ browser }) => {

        /**
         * Step 1: Додаємо мета-дані для структурування звіту в Allure
         * Best Practice:
         * - Додаємо розділи epic, feature, story для читабельності звітів.
         * - Вказуємо severity для визначення важливості тесту.
         */
        await allure.epic('Authentication');
        await allure.feature('Basic Auth');
        await allure.story('Invalid credentials');
        await allure.severity('critical');

        /**
         * Step 2: Створення нового контексту браузера з неправильними httpCredentials
         * Best Practice:
         * - Авторизаційні дані передаються через параметр httpCredentials під час створення контексту.
         * - Це дозволяє симулювати неправильну базову автентифікацію.
         */
        const context = await browser.newContext({
            httpCredentials: {
                username: 'admin',         // Валідний логін
                password: 'wrong_password' // Невірний пароль
            }
        });

        /**
         * Step 3: Відкриваємо нову сторінку в створеному контексті
         * Очікування:
         * - Після переходу на сторінку Basic Auth користувач має отримати повідомлення про відмову в доступі.
         */
        const page = await context.newPage();

        /**
         * Step 4: Ініціалізуємо Page Object для Basic Auth сторінки
         * Best Practice:
         * - Використовуємо тільки page (не передаємо browser або context у Page Object).
         */
        const basicAuthPage = new BasicAuthPage(page);

        /**
         * Step 5: Переходимо на захищену сторінку Basic Auth
         * Очікування:
         * - Сторінка намагається автентифікувати користувача з наданими некоректними обліковими даними.
         */
        await allure.step('Перейти на сторінку Basic Auth з неправильними креденшіалами', async () => {
            await basicAuthPage.goto();
        });

        /**
         * Step 6: Перевіряємо, що доступ заборонено
         * Очікування:
         * - У тексті сторінки має бути вказано повідомлення "Not authorized" або аналогічне.
         */
        await allure.step('Перевірити, що доступ заборонено', async () => {

            // Отримуємо текст із body сторінки
            const errorMessageText = await basicAuthPage.getErrorMessageText();

            // Перевіряємо, що в тексті є повідомлення про помилку авторизації
            expect(errorMessageText).toContain('Not authorized');

            // Додаємо скріншот сторінки до звіту для візуального підтвердження результату
            const screenshot = await page.screenshot();
            await allure.attachment('Basic Auth Failed Screenshot', screenshot, 'image/png');
        });

        /**
         * Step 7: Закриваємо контекст після виконання тесту
         * Best Practice:
         * - Завжди звільняємо ресурси після тесту.
         */
        await context.close();
    });

});
