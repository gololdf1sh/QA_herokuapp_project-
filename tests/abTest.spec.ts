import { test } from '@playwright/test'; // Імпорт Playwright test-раннера
import { AbTestPage } from '../pages/AbTestPage.page'; // Імпорт Page Object для сторінки A/B тестування
import * as allure from 'allure-js-commons'; // Імпорт бібліотеки Allure для створення кроків у звіті

/**
 * Група тестів для сторінки A/B Testing
 */
test.describe('A/B Testing Page', () => {
    let abTestPage: AbTestPage; // Ініціалізуємо об'єкт сторінки

    /**
     * Хук, який виконується перед кожним тестом
     * - Створюємо об'єкт AbTestPage
     * - Переходимо на сторінку '/abtest'
     */
    test.beforeEach(async ({ page }) => {
        abTestPage = new AbTestPage(page); // Ініціалізуємо сторінку
        await allure.step('Перейти на сторінку A/B Testing', async () => {
            await abTestPage.goto(); // Виконуємо перехід на сторінку
        });
    });

    /**
     * ✅ Тест-кейс: Перевірка заголовка при оновленні сторінки
     * Мета:
     * - Перевірити, що заголовок на сторінці змінюється після очищення кешу та cookies
     * Критерії прийняття:
     * - Заголовок має бути не null при кожному оновленні сторінки
     */
    test('Перевірка заголовка при оновленні сторінки', async ({ context }) => {
        // Додаємо мета-інформацію до Allure звіту
        await allure.epic('UI Testing');
        await allure.feature('A/B Testing');
        await allure.severity('normal');

        // Крок тесту: очищення кешу, cookies, перезавантаження сторінки та перевірка заголовка
        await allure.step('Очищення кешу та оновлення сторінки', async () => {
            await abTestPage.checkHeadlineWithCacheClear(context, 10); // Метод виконує перевірку кілька разів
        });

        // Додаємо скріншот до звіту для перевірки UI після тесту
        const screenshot = await abTestPage.page.screenshot();
        await allure.attachment('A/B Testing Screenshot', screenshot, 'image/png');
    });
});
