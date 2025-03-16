import { test } from '@playwright/test';
import { StatusCodesPage } from '../../src/pages/StatusCodesPage.page';

/**
 * Тестова сьют для перевірки сторінки Status Codes
 */
test.describe('Status Codes Page', () => {
    let statusCodesPage: StatusCodesPage;

    test.beforeEach(async ({ page }) => {
        // Ініціалізація сторінки перед кожним тестом
        statusCodesPage = new StatusCodesPage(page);

        await test.step('Перейти на сторінку Status Codes', async () => {
            await statusCodesPage.goto();
        });
    });

    test('should display correct description for status code 200', async () => {
        await test.step('Клікнути по статус коду 200 і перевірити текст повідомлення', async () => {
            await statusCodesPage.clickStatusCodeAndExpect(
                '200',
                'This page returned a 200 status code'
            );
        });

        /**
         * Очікуваний результат:
         * Після переходу за лінком "200" відображається повідомлення:
         * "This page returned a 200 status code".
         */
    });

    test('should display correct description for status code 301', async () => {
        await test.step('Клікнути по статус коду 301 і перевірити текст повідомлення', async () => {
            await statusCodesPage.clickStatusCodeAndExpect(
                '301',
                'This page returned a 301 status code'
            );
        });

        /**
         * Очікуваний результат:
         * Після переходу за лінком "301" відображається повідомлення:
         * "This page returned a 301 status code".
         */
    });

    test('should display correct description for status code 404', async () => {
        await test.step('Клікнути по статус коду 404 і перевірити текст повідомлення', async () => {
            await statusCodesPage.clickStatusCodeAndExpect(
                '404',
                'This page returned a 404 status code'
            );
        });

        /**
         * Очікуваний результат:
         * Після переходу за лінком "404" відображається повідомлення:
         * "This page returned a 404 status code".
         */
    });

    test('should display correct description for status code 500', async () => {
        await test.step('Клікнути по статус коду 500 і перевірити текст повідомлення', async () => {
            await statusCodesPage.clickStatusCodeAndExpect(
                '500',
                'This page returned a 500 status code'
            );
        });

        /**
         * Очікуваний результат:
         * Після переходу за лінком "500" відображається повідомлення:
         * "This page returned a 500 status code".
         */
    });
});
