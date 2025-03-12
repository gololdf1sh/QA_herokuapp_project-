// Імпортуємо Playwright test-runner для організації та виконання тестів
import { test, expect } from '@playwright/test';

// Підключаємо Allure для детального логування та формування зрозумілих тестових звітів
import * as allure from 'allure-js-commons';

// Імпортуємо Page Object сторінки Basic Authentication
import { BasicAuthPage } from '../../src/pages/BasicAuthPage.page';

// Імпортуємо утиліту для створення авторизованих контекстів браузера (з базовою аутентифікацією)
import { createAuthContext } from '../../src/utils/browserUtils';

// Підключаємо тестові фікстури з валідними та невалідними користувачами
import { users } from '../../src/fixtures/users';

/**
 * ✅ Тестова сьют для Basic Authentication
 *
 * Ціль: перевірити успішні й неуспішні сценарії базової аутентифікації на сторінці /basic_auth.
 */
test.describe('Basic Auth Tests', () => {

    /**
     * ✅ Позитивний тест-кейс: успішна авторизація користувача з валідними даними.
     *
     * Сценарій:
     * 1. Створити новий контекст браузера з передачею коректних httpCredentials.
     * 2. Перейти на сторінку Basic Auth.
     * 3. Перевірити, що з'явилось повідомлення про успішний доступ.
     */
    test('Успішний вхід через Basic Auth', async ({ browser }) => {

        // Блок мета-даних у Allure для зручної навігації по звіту
        await allure.epic('Authentication');
        await allure.feature('Basic Auth');
        await allure.story('Valid credentials');
        await allure.severity('critical');

        // Крок 1: створення контексту браузера з коректними логіном та паролем
        const context = await createAuthContext(browser, users.validAdmin.username, users.validAdmin.password);

        // Крок 2: відкриваємо нову сторінку в контексті з авторизацією
        const page = await context.newPage();
        const basicAuthPage = new BasicAuthPage(page);

        // Крок 3: переходимо на захищену сторінку Basic Auth
        await basicAuthPage.goto();

        // Крок 4: валідація повідомлення про успішний доступ
        await allure.step('Перевірити, що вхід успішний', async () => {
            const message = await basicAuthPage.getSuccessMessageText();
            expect(message).toContain('Congratulations!'); // Очікуємо повідомлення про успішний вхід
        });

        await context.close(); // Закриваємо контекст браузера після тесту
    });

    /**
     * ❌ Негативний тест-кейс: авторизація з некоректними даними має бути відхилена.
     *
     * Сценарій:
     * 1. Створити новий контекст браузера з невалідними httpCredentials.
     * 2. Перейти на сторінку Basic Auth.
     * 3. Перевірити, що доступ заборонено (отримано помилку авторизації).
     */
    test('Негативний сценарій: Невірний логін або пароль', async ({ browser }) => {

        // Блок мета-даних у Allure
        await allure.epic('Authentication');
        await allure.feature('Basic Auth');
        await allure.story('Invalid credentials');
        await allure.severity('critical');

        // Крок 1: створення контексту браузера з неправильними логіном/паролем
        const context = await createAuthContext(browser, users.invalidAdmin.username, users.invalidAdmin.password);

        // Крок 2: відкриваємо нову сторінку
        const page = await context.newPage();
        const basicAuthPage = new BasicAuthPage(page);

        // Крок 3: переходимо на захищену сторінку Basic Auth
        await basicAuthPage.goto();

        // Крок 4: валідація повідомлення про невдалу спробу входу
        await allure.step('Перевірити, що доступ заборонено', async () => {
            const errorMessage = await basicAuthPage.getErrorMessageText();
            expect(errorMessage).toContain('Not authorized'); // Очікуємо повідомлення про відмову в доступі
        });

        await context.close(); // Закриваємо контекст після тесту
    });
});
