import { Page, Locator, expect } from '@playwright/test';

export class FloatingMenuPage {
    readonly page: Page;
    readonly floatingMenu: Locator;
    readonly homeLink: Locator;
    readonly newsLink: Locator;
    readonly contactLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.floatingMenu = page.locator('#menu');
        this.homeLink = page.locator('#menu a[href="#home"]');
        this.newsLink = page.locator('#menu a[href="#news"]');
        this.contactLink = page.locator('#menu a[href="#contact"]');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/floating_menu');
    }

    async scrollToBottom() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }

    async assertMenuIsVisible() {
        await expect(this.floatingMenu).toBeVisible();
    }

    async clickHomeLink() {
        await this.homeLink.click();
    }

    async clickNewsLink() {
        await this.newsLink.click();
    }

    async clickContactLink() {
        await this.contactLink.click();
    }

    async assertUrlContains(anchor: string) {
        await expect(this.page).toHaveURL(new RegExp(`#${anchor}$`));
    }
}
