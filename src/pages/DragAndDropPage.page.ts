import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Drag And Drop
 */
export class DragAndDropPage {
    readonly page: Page;

    /**
     * Локатори для обох коробок (A та B)
     */
    private columnA: Locator;
    private columnB: Locator;

    /**
     * Конструктор класу DragAndDropPage
     * @param page - об'єкт Playwright Page
     */
    constructor(page: Page) {
        this.page = page;

        this.columnA = page.locator('#column-a');
        this.columnB = page.locator('#column-b');
    }

    /**
     * Перехід на сторінку Drag and Drop
     */
    async goto(): Promise<void> {
        await this.page.goto('/drag_and_drop');
    }

    /**
     * Перетягує елемент A у B
     */
    async dragAtoB(): Promise<void> {
        // Примітка: в Playwright drag and drop працює нестабільно на цій сторінці через js реалізацію.
        await this.columnA.dragTo(this.columnB);
    }

    /**
     * Перевіряє, що Box A має конкретний заголовок
     * @param expectedText - очікуваний текст (A або B)
     */
    async expectColumnAText(expectedText: string): Promise<void> {
        const header = this.columnA.locator('header');
        await expect(header).toHaveText(expectedText);
    }

    /**
     * Перевіряє, що Box B має конкретний заголовок
     * @param expectedText - очікуваний текст (A або B)
     */
    async expectColumnBText(expectedText: string): Promise<void> {
        const header = this.columnB.locator('header');
        await expect(header).toHaveText(expectedText);
    }
}
