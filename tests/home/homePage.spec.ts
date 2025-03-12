import { test } from '@playwright/test'; // Імпортуємо Playwright test-раннер
import { HomePage } from '../../src/pages/HomePage.page'; // Імпортуємо Page Object для головної сторінки
import * as allure from "allure-js-commons"; // Імпортуємо Allure для генерації тестових звітів

/**
 * ✅ Група тестів для навігації з головної сторінки
 */
test.describe('Home Page Navigation', () => {

    // Оголошуємо змінну для Page Object головної сторінки
    let homePage: HomePage;

    /**
     * ✅ Хук, що виконується перед кожним тестом
     * - Ініціалізуємо екземпляр головної сторінки
     * - Переходимо на головну сторінку сайту
     * Best Practice: виконувати навігацію в beforeEach, щоб уникнути дублювання коду
     */
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);

        // Крок у звіті Allure: перехід на головну сторінку
        await allure.step('Відкрити головну сторінку', async () => {
            await homePage.goto(); // Відкриваємо головну сторінку перед кожним тестом
        });
    });

    /**
     * ✅ Масив маршрутів для навігації
     * - Масив містить інформацію про ключ маршруту та його опис
     * Best Practice: використовувати data-driven testing для зменшення дублювання коду
     */
    const navigationRoutes = [
        { key: 'abTest', description: 'A/B Testing' },               // Переходимо на сторінку A/B Testing
        { key: 'addRemoveElements', description: 'Add/Remove Elements' }, // Переходимо на сторінку Add/Remove Elements
        { key: 'brokenImages', description: 'Broken Images' }            // Переходимо на сторінку Broken Images
    ];

    /**
     * ✅ Ітеруємо по кожному маршруту та створюємо окремий тест-кейс
     * Best Practice:
     * - Використовуємо forEach для генерації тестів на основі даних (data-driven testing)
     * - Це дозволяє масштабувати тестування без дублювання коду
     */
    navigationRoutes.forEach(({ key, description }) => {

        /**
         * ✅ Тест-кейс перевірки переходу на певну сторінку з головної
         * Мета:
         * - Переконатися, що посилання на головній сторінці веде на правильний URL
         * Критерії прийняття:
         * - Після натискання на посилання URL відповідає очікуваному значенню
         */
        test(`Перехід на сторінку ${description}`, async () => {

            // ➡️ Додаємо мета-дані до Allure звіту
            await allure.epic('Navigation');                // Група тестів навігації
            await allure.feature('Main Page Links');        // Перевірка посилань на головній сторінці
            await allure.severity('minor');                 // Пріоритет тесту (мінорний)

            /**
             * Step 1: Перехід за посиланням з головної сторінки
             * - Викликаємо метод навігації з Page Object
             * Best Practice: винести логіку переходів у Page Object для зручності повторного використання
             */
            await allure.step(`Перейти на ${description}`, async () => {
                await homePage.navigateToPage(key); // Переходимо на сторінку за ключем
            });

            /**
             * Step 2: Перевірка URL після переходу
             * - Викликаємо метод перевірки URL з Page Object
             * - Додаємо скріншот до звіту Allure після перевірки
             */
            await allure.step('Перевірити, що URL правильний', async () => {
                await homePage.checkURL(key); // Перевіряємо, що URL відповідає очікуванню

                // Робимо скріншот поточної сторінки
                const screenshot = await homePage.page.screenshot();

                // Додаємо скріншот до звіту Allure для візуального підтвердження переходу
                await allure.attachment(`Screenshot of ${description}`, screenshot, 'image/png');
            });
        });
    });
});
