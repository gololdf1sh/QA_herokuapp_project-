import { Page, Locator, expect } from '@playwright/test';

export class SortableTablesPage {
    readonly page: Page;
    readonly table1: Locator;
    readonly table2: Locator;

    constructor(page: Page) {
        this.page = page;
        this.table1 = page.locator('#table1');
        this.table2 = page.locator('#table2');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/tables');
    }

    // Повертає значення колонок у таблиці (без заголовків)
    async getTableData(table: Locator): Promise<string[][]> {
        const rows = table.locator('tbody tr');
        const rowCount = await rows.count();
        const data: string[][] = [];

        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);
            const cells = row.locator('td');
            const cellCount = await cells.count();
            const rowData: string[] = [];

            for (let j = 0; j < cellCount; j++) {
                rowData.push(await cells.nth(j).innerText());
            }

            data.push(rowData);
        }

        return data;
    }

    async clickTableHeader(table: Locator, headerText: string) {
        const headers = table.locator('thead th');
        const count = await headers.count();

        for (let i = 0; i < count; i++) {
            const header = headers.nth(i);
            const text = await header.innerText();

            if (text.includes(headerText)) {
                await header.click();
                break;
            }
        }
    }

    async assertColumnSortedAsc(table: Locator, columnIndex: number) {
        const data = await this.getTableData(table);
        const columnValues = data.map(row => row[columnIndex]);
        const sorted = [...columnValues].sort();

        expect(columnValues).toEqual(sorted);
    }

    async assertColumnSortedDesc(table: Locator, columnIndex: number) {
        const data = await this.getTableData(table);
        const columnValues = data.map(row => row[columnIndex]);
        const sorted = [...columnValues].sort().reverse();

        expect(columnValues).toEqual(sorted);
    }
}
