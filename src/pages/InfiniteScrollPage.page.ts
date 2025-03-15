import { Page, Locator, expect } from '@playwright/test';

export class InfiniteScrollPage {
    readonly page: Page;
    readonly paragraphs: Locator;

    constructor(page: Page) {
        this.page = page;
        this.paragraphs = page.locator('.jscroll-added'); // виправили локатор
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/infinite_scroll');
    }

    async getParagraphsCount(): Promise<number> {
        return await this.paragraphs.count();
    }

    async scrollDown(pixels: number = 1000) {
        await this.page.evaluate((scrollY) => {
            window.scrollBy(0, scrollY);
        }, pixels);

        await this.page.waitForTimeout(1000); // зачекати щоб підвантажився новий контент
    }

    async waitForNewParagraphs(expectedCount: number) {
        await expect(this.paragraphs).toHaveCount(expectedCount, { timeout: 10000 });
    }
}
