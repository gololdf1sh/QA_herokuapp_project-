import { Page, Locator, expect } from '@playwright/test';

export class StatusCodesPage {
    readonly page: Page;
    readonly statusLinks: Locator;
    readonly statusText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.statusLinks = page.locator('.example ul li a');
        this.statusText = page.locator('.example p');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/status_codes');
    }

    async clickStatusCodeLink(statusCode: string) {
        const link = this.statusLinks.filter({ hasText: statusCode });
        await expect(link).toBeVisible();
        await link.click();
    }

    async assertStatusTextContains(expectedText: string) {
        await expect(this.statusText).toContainText(expectedText);
    }

    async goBack() {
        await this.page.goBack();
    }
}
