import { test, expect } from '@playwright/test';
import { SortableTablesPage } from '../../src/pages/SortableTablesPage.page';

test.describe('Sortable Data Tables Page', () => {
    let sortableTablesPage: SortableTablesPage;

    test.beforeEach(async ({ page }) => {
        sortableTablesPage = new SortableTablesPage(page);
        await sortableTablesPage.goto();
    });

    test('Table 1: Сортування по "Last Name" за зростанням', async () => {
        await sortableTablesPage.clickTableHeader(sortableTablesPage.table1, 'Last Name');
        await sortableTablesPage.assertColumnSortedAsc(sortableTablesPage.table1, 0); // 0 - перша колонка "Last Name"
    });

    test('Table 1: Сортування по "Last Name" за спаданням', async () => {
        await sortableTablesPage.clickTableHeader(sortableTablesPage.table1, 'Last Name'); // перший клік - за зростанням
        await sortableTablesPage.clickTableHeader(sortableTablesPage.table1, 'Last Name'); // другий клік - за спаданням
        await sortableTablesPage.assertColumnSortedDesc(sortableTablesPage.table1, 0);
    });

    test('Table 2: Значення першої строки правильні', async () => {
        const data = await sortableTablesPage.getTableData(sortableTablesPage.table2);

        expect(data[0][0]).toBe('Smith'); // Last Name
        expect(data[0][1]).toBe('John');  // First Name
        expect(data[0][2]).toBe('jsmith@gmail.com'); // Email
    });

    test('Table 2: Сортування по "Email"', async () => {
        await sortableTablesPage.clickTableHeader(sortableTablesPage.table2, 'Email');
        await sortableTablesPage.assertColumnSortedAsc(sortableTablesPage.table2, 2); // 2 - колонка Email
    });
});
