import { Page, Locator, expect } from '@playwright/test';

export class DynamicContentPage {
    readonly page: Page;
    readonly rows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.rows = page.locator('#content > div.row');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/dynamic_content');
    }

    async getTextsFromRows(): Promise<string[]> {
        const count = await this.rows.count();
        const texts = [];

        for (let i = 0; i < count; i++) {
            const text = await this.rows.nth(i).innerText();
            texts.push(text.trim());
        }

        return texts;
    }

    async refreshPage() {
        await this.page.reload();
    }

    async assertContentChanged(initialTexts: string[], newTexts: string[]) {
        // Перевіримо, що є хоча б одна зміна між двома наборами тексту
        const hasChanged = initialTexts.some((text, index) => text !== newTexts[index]);
        expect(hasChanged).toBeTruthy();
    }
}
