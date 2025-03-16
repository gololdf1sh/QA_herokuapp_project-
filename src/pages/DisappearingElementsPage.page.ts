import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Disappearing Elements
 */
export class DisappearingElementsPage {
    readonly page: Page;

    /**
     * Локатор для пунктів меню
     */
    private menuItems: Locator;

    /**
     * Конструктор класу DisappearingElementsPage
     * @param page - об'єкт Playwright Page
     */
    constructor(page: Page) {
        this.page = page;
        this.menuItems = page.locator('ul li a');
    }

    /**
     * Перехід на сторінку Disappearing Elements
     */
    async goto(): Promise<void> {
        await this.page.goto('/disappearing_elements');
    }

    /**
     * Перевіряє наявність пункту меню за його текстом
     * @param itemText - текст пункту меню (наприклад, 'Gallery')
     */
    async expectMenuItemVisible(itemText: string): Promise<void> {
        const menuItem = this.page.locator(`ul li a:has-text("${itemText}")`);
        await expect(menuItem).toBeVisible();
    }

    /**
     * Перезавантажує сторінку
     */
    async reload(): Promise<void> {
        await this.page.reload();
    }
}
