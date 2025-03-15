import { Page, Locator, expect } from '@playwright/test';

export class HoversPage {
    readonly page: Page;
    readonly figureImages: Locator;
    readonly figureCaptions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.figureImages = page.locator('.figure'); // аватарки
        this.figureCaptions = page.locator('.figcaption'); // підпис, що з'являється при наведенні
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/hovers');
    }

    async hoverOverFigure(index: number) {
        await this.figureImages.nth(index).hover();
    }

    async getCaptionText(index: number): Promise<string> {
        return await this.figureCaptions.nth(index).innerText();
    }

    async assertCaptionVisible(index: number) {
        await expect(this.figureCaptions.nth(index)).toBeVisible();
    }

    async assertCaptionContains(index: number, expectedText: string) {
        await expect(this.figureCaptions.nth(index)).toContainText(expectedText);
    }
}
