import { Page, Locator, expect } from '@playwright/test';

export class MultipleWindowsPage {
    readonly page: Page;
    readonly link: Locator;

    constructor(page: Page) {
        this.page = page;
        this.link = page.locator('a[href="/windows/new"]');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/windows');
    }

    async openNewWindow() {
        // Клік по лінці, яка відкриває нову вкладку
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'), // Чекаємо нову вкладку
            this.link.click(),                        // Клікаємо по посиланню
        ]);
        return newPage;
    }
}
