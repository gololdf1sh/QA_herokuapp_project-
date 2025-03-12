import { test } from '@playwright/test'; // Імпортуємо Playwright test-раннер
import { BrokenImagesPage } from '../../src/pages/BrokenImagesPage.page'; // Підключаємо Page Object для сторінки Broken Images
import * as allure from "allure-js-commons"; // Імпортуємо Allure для побудови тестових звітів

/**
 * ✅ Група тестів для перевірки відображення зображень на сторінці Broken Images
 */
test.describe('Broken Images', () => {

    // Оголошення змінної під Page Object
    let brokenImagesPage: BrokenImagesPage;

    /**
     * ✅ Хук, що виконується перед кожним тестом:
     * - Створюється новий екземпляр Page Object
     * - Виконується перехід на тестову сторінку Broken Images
     * Best practice: винесення навігації в beforeEach, щоб не дублювати код у тестах.
     */
    test.beforeEach(async ({ page }) => {
        brokenImagesPage = new BrokenImagesPage(page);

        // Крок у звіті Allure: відкриваємо сторінку
        await allure.step('Перейти на сторінку Broken Images', async () => {
            await brokenImagesPage.goto(); // Переходимо на сторінку з зображеннями
        });
    });

    /**
     * ✅ Основний тест-кейс:
     * - Перевіряємо наявність зламаних зображень на сторінці
     * Best practice:
     * - Використання Allure для документування кожного бізнес-кроку
     * - Рекомендовано додавати assert (expect) у тест, щоб результат був очевидний (але у цьому коді він всередині Page Object)
     */
    test('Перевірка зламаних зображень', async () => {

        // Додаємо мета-дані до Allure звіту, щоб покращити структуру репорту
        await allure.epic('UI Testing'); // Група тестів в Allure
        await allure.feature('Images Validation'); // Фіча, яку тестуємо
        await allure.severity('minor'); // Визначаємо пріоритет цього тесту

        /**
         * ✅ Крок тесту:
         * - Перевірка наявності зламаних зображень на сторінці
         * - Метод checkBrokenImages() виконує основну логіку перевірки
         * Best practice: варто повертати з методу кількість зламаних зображень і робити expect прямо у spec (але це не обов’язково, залежить від підходу команди).
         */
        await allure.step('Перевірка наявності зламаних зображень', async () => {
            await brokenImagesPage.checkBrokenImages(); // Викликаємо метод перевірки у Page Object

            // Додаємо скріншот до звіту Allure для візуалізації результату тесту
            const screenshot = await brokenImagesPage.page.screenshot(); // Робимо знімок екрану після перевірки
            await allure.attachment('Broken Images Page Screenshot', screenshot, 'image/png'); // Прикріплюємо його до звіту
        });
    });

});
