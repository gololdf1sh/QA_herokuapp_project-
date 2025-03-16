import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Sortable Tables
 */
export class SortableTablesPage {
    readonly page: Page;

    // Приватні локатори для обох таблиць
    private table1: Locator;
    private table2: Locator;

    constructor(page: Page) {
        this.page = page;
        this.table1 = page.locator('#table1');
        this.table2 = page.locator('#table2');
    }

    /**
     * Перехід на сторінку Sortable Tables
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/tables');
    }

    /**
     * Отримати дані таблиці у вигляді масиву рядків і колонок
     * @param tableIndex Індекс таблиці (1 або 2)
     * @returns Масив даних таблиці
     */
    async getTableData(tableIndex: number): Promise<string[][]> {
        const table = this.getTableByIndex(tableIndex);
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

    /**
     * Натиснути на заголовок колонки за її текстом
     * @param tableIndex Індекс таблиці (1 або 2)
     * @param headerText Текст заголовка колонки
     */
    async clickTableHeader(tableIndex: number, headerText: string): Promise<void> {
        const table = this.getTableByIndex(tableIndex);
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

    /**
     * Перевірити, що колонка відсортована за зростанням
     * @param tableIndex Індекс таблиці
     * @param columnIndex Індекс колонки (починається з 0)
     */
    async expectColumnSortedAsc(tableIndex: number, columnIndex: number): Promise<void> {
        const data = await this.getTableData(tableIndex);
        const columnValues = data.map(row => row[columnIndex]);
        const sorted = [...columnValues].sort();

        expect(columnValues).toEqual(sorted);
    }

    /**
     * Перевірити, що колонка відсортована за спаданням
     * @param tableIndex Індекс таблиці
     * @param columnIndex Індекс колонки (починається з 0)
     */
    async expectColumnSortedDesc(tableIndex: number, columnIndex: number): Promise<void> {
        const data = await this.getTableData(tableIndex);
        const columnValues = data.map(row => row[columnIndex]);
        const sorted = [...columnValues].sort().reverse();

        expect(columnValues).toEqual(sorted);
    }

    /**
     * Повна дія: натиснути на заголовок і перевірити сортування
     * @param tableIndex Індекс таблиці (1 або 2)
     * @param headerText Текст заголовка колонки
     * @param columnIndex Індекс колонки
     * @param sortDirection Напрям сортування: 'asc' або 'desc'
     */
    async sortByHeaderAndExpectSorted(
        tableIndex: number,
        headerText: string,
        columnIndex: number,
        sortDirection: 'asc' | 'desc'
    ): Promise<void> {
        await this.clickTableHeader(tableIndex, headerText);

        if (sortDirection === 'asc') {
            await this.expectColumnSortedAsc(tableIndex, columnIndex);
        } else {
            await this.expectColumnSortedDesc(tableIndex, columnIndex);
        }
    }

    /**
     * Отримати таблицю за індексом
     * @param index 1 або 2
     * @returns Locator для таблиці
     */
    private getTableByIndex(index: number): Locator {
        if (index === 1) {
            return this.table1;
        } else if (index === 2) {
            return this.table2;
        } else {
            throw new Error(`Таблиця з індексом ${index} не знайдена`);
        }
    }
}
