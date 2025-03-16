import { Page, Locator, expect } from '@playwright/test';

export class FloatingMenuPage {
    readonly page: Page;
    private floatingMenu: Locator;
    private menuLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.floatingMenu = page.locator('#menu');
        this.menuLinks = page.locator('#menu a');
    }

    /**
     * Перехід на сторінку Floating Menu
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/floating_menu');
    }

    /**
     * Перевірка видимості меню
     */
    async assertMenuVisible(): Promise<void> {
        await expect(this.floatingMenu).toBeVisible();
    }

    /**
     * Прокрутка сторінки вниз
     */
    async scrollPageDown(): Promise<void> {
        await this.page.evaluate(() => {
            window.scrollBy(0, 1000);
        });
    }

    /**
     * Клік по посиланню меню за назвою
     * @param linkText Текст посилання (Home, News, Contact, About)
     */
    async clickMenuLink(linkText: string): Promise<void> {
        const link = this.page.locator(`#menu a:has-text("${linkText}")`);
        await link.click();
    }

    /**
     * Перевірка наявності всіх пунктів меню
     */
    async assertAllMenuLinksVisible(): Promise<void> {
        const menuItems = ['Home', 'News', 'Contact', 'About'];

        for (const item of menuItems) {
            const link = this.page.locator(`#menu a:has-text("${item}")`);
            await expect(link).toBeVisible();
        }
    }
}
