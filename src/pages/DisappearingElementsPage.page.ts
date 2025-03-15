import { Page, Locator, expect } from '@playwright/test';

export class DisappearingElementsPage {
    readonly page: Page;
    readonly menuItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuItems = page.locator('ul li');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/disappearing_elements');
    }

    // Повертаємо список видимих пунктів меню
    async getMenuItemsText(): Promise<string[]> {
        const count = await this.menuItems.count();
        const texts = [];
        for (let i = 0; i < count; i++) {
            texts.push(await this.menuItems.nth(i).innerText());
        }
        return texts;
    }

    // Перевіряємо наявність певного пункту меню
    async assertMenuItemExists(itemText: string) {
        const items = await this.getMenuItemsText();
        expect(items).toContain(itemText);
    }

    // Перевіряємо, що пункту меню немає
    async assertMenuItemNotExists(itemText: string) {
        const items = await this.getMenuItemsText();
        expect(items).not.toContain(itemText);
    }
}
