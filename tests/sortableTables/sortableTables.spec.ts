import { test, expect } from '@playwright/test';
import { SortableTablesPage } from '../../src/pages/SortableTablesPage.page';

/**
 * Тестова сьют для перевірки таблиць зі сортуванням на сторінці Sortable Tables
 */
test.describe('Sortable Data Tables Page', () => {
    let sortableTablesPage: SortableTablesPage;

    test.beforeEach(async ({ page }) => {
        sortableTablesPage = new SortableTablesPage(page);

        await test.step('Перейти на сторінку Sortable Tables', async () => {
            await sortableTablesPage.goto();
        });
    });

    test('should sort "Last Name" column in Table 1 ascending', async () => {
        await test.step('Відсортувати колонку "Last Name" в таблиці 1 за зростанням', async () => {
            await sortableTablesPage.sortByHeaderAndExpectSorted(1, 'Last Name', 0, 'asc');
        });

        /**
         * Очікуваний результат:
         * Після сортування перша колонка ("Last Name") відсортована у порядку зростання.
         */
    });

    test('should sort "Last Name" column in Table 1 descending', async () => {
        await test.step('Відсортувати колонку "Last Name" в таблиці 1 за спаданням', async () => {
            // Два кліки для зміни напрямку сортування
            await sortableTablesPage.clickTableHeader(1, 'Last Name');
            await sortableTablesPage.sortByHeaderAndExpectSorted(1, 'Last Name', 0, 'desc');
        });

        /**
         * Очікуваний результат:
         * Після двох кліків перша колонка ("Last Name") відсортована у порядку спадання.
         */
    });

    test('should display correct data in the first row of Table 2', async () => {
        let tableData: string[][];

        await test.step('Отримати дані з таблиці 2', async () => {
            tableData = await sortableTablesPage.getTableData(2);
        });

        await test.step('Перевірити дані першого рядка таблиці 2', async () => {
            expect(tableData[0][0]).toBe('Smith');                // Last Name
            expect(tableData[0][1]).toBe('John');                 // First Name
            expect(tableData[0][2]).toBe('jsmith@gmail.com');     // Email
        });

        /**
         * Очікуваний результат:
         * Перший рядок таблиці 2 містить:
         * - Last Name: Smith
         * - First Name: John
         * - Email: jsmith@gmail.com
         */
    });

    test('should sort "Email" column in Table 2 ascending', async () => {
        await test.step('Відсортувати колонку "Email" в таблиці 2 за зростанням', async () => {
            await sortableTablesPage.sortByHeaderAndExpectSorted(2, 'Email', 2, 'asc');
        });

        /**
         * Очікуваний результат:
         * Колонка "Email" у таблиці 2 відсортована у порядку зростання.
         */
    });
});
