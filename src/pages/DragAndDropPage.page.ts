import { Page, Locator, expect } from '@playwright/test';

export class DragAndDropPage {
    readonly page: Page;
    readonly columnA: Locator;
    readonly columnB: Locator;

    constructor(page: Page) {
        this.page = page;
        this.columnA = page.locator('#column-a');
        this.columnB = page.locator('#column-b');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    }

    async dragAtoB() {
        // Використовуємо dragAndDrop API (починаючи з Playwright 1.20+)
        await this.columnA.dragTo(this.columnB);
    }

    async assertColumnOrder(expectedFirstColumnText: string) {
        const columnAHeader = this.columnA.locator('header');
        await expect(columnAHeader).toHaveText(expectedFirstColumnText);
    }
}
