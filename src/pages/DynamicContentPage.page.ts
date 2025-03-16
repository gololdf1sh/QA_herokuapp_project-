import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Dynamic Content
 */
export class DynamicContentPage {
    readonly page: Page;

    /**
     * Локатор для динамічного контенту
     */
    private contentRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contentRows = page.locator('#content .row');
    }

    /**
     * Перехід на сторінку Dynamic Content
     */
    async goto(): Promise<void> {
        await this.page.goto('/dynamic_content');
    }

    /**
     * Отримує текст контенту за індексом (0, 1, 2)
     * @param index - індекс рядка
     */
    private async getRowText(index: number): Promise<string> {
        return await this.contentRows.nth(index).textContent() ?? '';
    }

    /**
     * Перевіряє, що контент змінюється після reload
     * @param index - індекс рядка
     */
    async expectContentChangesAfterReload(index: number): Promise<void> {
        const initialText = await this.getRowText(index);
        await this.page.reload();
        const newText = await this.getRowText(index);

        expect(initialText).not.toBe(newText);
    }

    /**
     * Перевіряє кількість рядків контенту ➔ гнучка перевірка
     */
    async expectContentRowsCountFlexible(): Promise<void> {
        const count = await this.contentRows.count();
        expect([3, 4]).toContain(count);
    }
}
