import { test } from '@playwright/test'; // Імпортуємо Playwright тест-раннер
import * as allure from 'allure-js-commons'; // Підключаємо Allure для генерації тестових звітів
import { AbTestPage } from '../../src/pages/AbTestPage.page'; // Імпортуємо Page Object сторінки A/B Testing

/**
 * Тестова сьют для перевірки роботи сторінки A/B Testing TEST
 *
 * Мета: перевірити, що заголовок змінюється при очищенні кешу і куків браузера (A/B тестування)
 */
test.describe('A/B Testing Page', () => {
    let abTestPage: AbTestPage; // Об'єкт сторінки A/B Testing

    /**
     * Виконується перед кожним тестом
     * - Ініціалізуємо Page Object
     * - Переходимо на сторінку A/B Testing
     */
    test.beforeEach(async ({ page }) => {
        abTestPage = new AbTestPage(page); // Ініціалізація сторінки

        // Додаємо крок у Allure репорт: перехід на сторінку
        await allure.step('Перейти на сторінку A/B Testing', async () => {
            await abTestPage.goto(); // Переходимо на сторінку A/B Testing
        });
    });

    /**
     * ✅ Тест-кейс: Перевірка зміни заголовка при очищенні кешу
     *
     * Логіка тесту:
     * 1. Зчитати перший заголовок
     * 2. Очистити кеш і куки
     * 3. Перезавантажити сторінку
     * 4. Перевірити, що заголовок змінився
     *
     * @param context - контекст браузера для роботи з кешем і куками
     */
    test('Перевірка заголовка при оновленні сторінки', async ({ context }) => {
        // Додаємо мета-дані в Allure репорт
        await allure.epic('UI Testing');
        await allure.feature('A/B Testing');
        await allure.severity('normal');

        // Крок: очищення кешу і перевірка заголовка при оновленні
        await allure.step('Очищення кешу та оновлення сторінки', async () => {
            await abTestPage.checkHeadlineWithCacheClear(context, 10); // Виклик методу з кількістю спроб 10
        });

        // Додаємо фінальний скріншот до звіту
        const screenshot = await abTestPage.page.screenshot();
        await allure.attachment('A/B Testing Screenshot', screenshot, 'image/png');
    });
});
