import { Page, Locator, expect } from '@playwright/test';

export class DynamicLoadingPage {
    readonly page: Page;
    readonly example1Link: Locator;
    readonly example2Link: Locator;
    readonly startButton: Locator;
    readonly loadingSpinner: Locator;
    readonly loadedText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.example1Link = page.locator('a[href="/dynamic_loading/1"]');
        this.example2Link = page.locator('a[href="/dynamic_loading/2"]');
        this.startButton = page.locator('#start button');
        this.loadingSpinner = page.locator('#loading');
        this.loadedText = page.locator('#finish h4');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/dynamic_loading');
    }

    async goToExample(exampleNumber: number) {
        if (exampleNumber === 1) {
            await this.example1Link.click();
        } else if (exampleNumber === 2) {
            await this.example2Link.click();
        } else {
            throw new Error('Invalid example number');
        }
    }

    async startLoading() {
        await this.startButton.click();
    }

    async waitForLoadingToFinish() {
        await this.loadingSpinner.waitFor({ state: 'hidden' });
    }

    async assertLoadedText(expectedText: string) {
        await expect(this.loadedText).toHaveText(expectedText);
    }
}
