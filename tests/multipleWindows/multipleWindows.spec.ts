import { test } from '@playwright/test';
import { MultipleWindowsPage } from '../../src/pages/MultipleWindowsPage.page';

/**
 * Тестова сьют для перевірки відкриття нових вкладок на сторінці Multiple Windows
 */
test.describe('Multiple Windows Page', () => {
    let multipleWindowsPage: MultipleWindowsPage;

    test.beforeEach(async ({ page }) => {
        // Ініціалізація сторінки перед кожним тестом
        multipleWindowsPage = new MultipleWindowsPage(page);

        await test.step('Перейти на сторінку Multiple Windows', async () => {
            await multipleWindowsPage.goto();
        });
    });

    test('should open a new window and verify its content', async () => {
        // Крок 1: Відкрити нову вкладку
        const newPage = await test.step('Відкрити нову вкладку, клікнувши по посиланню', async () => {
            return await multipleWindowsPage.openNewWindow();
        });

        // Крок 2: Перевірити контент нової вкладки
        await test.step('Перевірити, що нова вкладка містить текст "New Window"', async () => {
            await multipleWindowsPage.expectNewWindowContent(newPage, 'New Window');
        });

        /**
         * Очікуваний результат:
         * На новій вкладці присутній заголовок "New Window", що підтверджує успішне відкриття.
         */

        // Крок 3: Повернутись до основної вкладки
        await test.step('Повернутись до головної вкладки', async () => {
            await multipleWindowsPage.page.bringToFront();
        });

        // Крок 4: Перевірити контент головної вкладки
        await test.step('Перевірити, що основна вкладка містить текст "Opening a new window"', async () => {
            const mainHeading = multipleWindowsPage.page.locator('h3');

            // Очікуємо, що заголовок на головній вкладці буде коректним
            await test.expect(mainHeading, 'Заголовок головної вкладки не співпадає з очікуваним')
                .toHaveText('Opening a new window');
        });

        /**
         * Очікуваний результат:
         * Головна вкладка продовжує відображати свій вміст — "Opening a new window".
         */
    });
});
