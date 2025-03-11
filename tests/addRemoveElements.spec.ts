import { test, expect } from '@playwright/test'; // Імпорт основних методів Playwright
import * as allure from 'allure-js-commons';     // Імпорт Allure для звітності
import { AddRemoveElementsPage } from '../pages/AddRemoveElementsPage.page'; // Імпорт Page Object

/**
 * ✅ Група тестів для функціональності "Add/Remove Elements"
 */
test.describe('Add/Remove Elements Tests', () => {
    let addRemoveElementsPage: AddRemoveElementsPage; // Змінна для сторінки з елементами

    /**
     * Константи, що визначають кількість елементів у сценарії тесту:
     * - ELEMENTS_TO_ADD: скільки елементів додамо
     * - ELEMENTS_TO_REMOVE: скільки з них видалимо
     */
    const ELEMENTS_TO_ADD = 8;
    const ELEMENTS_TO_REMOVE = 7;

    /**
     * Хук перед кожним тестом
     * - Створюємо екземпляр сторінки
     * - Переходимо на цільову сторінку
     */
    test.beforeEach(async ({ page }) => {
        addRemoveElementsPage = new AddRemoveElementsPage(page);

        // Крок у звіті: перехід на сторінку
        await test.step('Перейти на сторінку Add/Remove Elements', async () => {
            await addRemoveElementsPage.goto();
        });
    });

    /**
     * ✅ Основний тест-кейс: Додаємо та видаляємо елементи на сторінці
     * Мета тесту:
     * - Перевірити функціонал додавання та видалення елементів
     * Критерії прийняття:
     * - Кількість кнопок Delete на сторінці повинна відповідати очікуванню
     */
    test('Add and Remove Elements', async ({ page }) => {

        // ➡️ Allure labels для поліпшення структури звіту
        await allure.epic('UI Elements');
        await allure.feature('Add/Remove Elements');
        await allure.severity('normal');
        await allure.owner('Oleksandr QA');

        /**
         * Step 1: Додаємо елементи на сторінку
         * - Перевіряємо, що елементи успішно додані
         */
        await test.step(`Додаємо ${ELEMENTS_TO_ADD} елементів`, async () => {
            await addRemoveElementsPage.addElements(ELEMENTS_TO_ADD);
        });

        /**
         * Step 2: Перевірка кількості доданих елементів
         * - Очікуємо, що на сторінці з'явиться стільки кнопок Delete, скільки ми додали
         */
        await test.step('Перевіряємо кількість елементів після додавання', async () => {
            await addRemoveElementsPage.checkDeleteButtonCount(ELEMENTS_TO_ADD);
        });

        /**
         * Step 3: Видаляємо частину елементів
         * - Імітуємо дію користувача з видалення частини елементів зі сторінки
         */
        await test.step(`Видаляємо ${ELEMENTS_TO_REMOVE} елементів`, async () => {
            await addRemoveElementsPage.deleteElements(ELEMENTS_TO_REMOVE);
        });

        /**
         * Step 4: Перевіряємо кількість елементів після видалення
         * - Переконуємось, що залишилась правильна кількість кнопок Delete
         */
        await test.step('Перевіряємо фінальну кількість елементів після видалення', async () => {
            const expectedCount = ELEMENTS_TO_ADD - ELEMENTS_TO_REMOVE;

            // Викликаємо метод перевірки кількості елементів
            await addRemoveElementsPage.checkDeleteButtonCount(expectedCount);

            // Додаємо скріншот до Allure звіту для перевірки фінального стану сторінки
            const screenshot = await page.screenshot();
            await allure.attachment('Final state screenshot', screenshot, 'image/png');
        });
    });
});
