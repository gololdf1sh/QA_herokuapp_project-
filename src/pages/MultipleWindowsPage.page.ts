import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Multiple Windows
 */
export class MultipleWindowsPage {
    readonly page: Page;

    // Приватний локатор
    private link: Locator;

    constructor(page: Page) {
        this.page = page;
        this.link = page.locator('a[href="/windows/new"]');
    }

    /**
     * Перехід на сторінку Multiple Windows
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/windows');
    }

    /**
     * Клік по посиланню для відкриття нової вкладки
     * @returns нову вкладку (page)
     */
    async openNewWindow(): Promise<Page> {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'), // Чекаємо відкриття нової вкладки
            this.link.click(),                        // Клікаємо по лінці
        ]);

        return newPage;
    }

    /**
     * Перевіряє контент на новій вкладці
     * @param newPage нова вкладка (Page)
     * @param expectedText Очікуваний текст на новій вкладці
     */
    async expectNewWindowContent(newPage: Page, expectedText: string): Promise<void> {
        await newPage.waitForLoadState('domcontentloaded');

        const heading = newPage.locator('h3');
        await expect(heading, 'Заголовок нової вкладки не відповідає очікуваному тексту')
            .toHaveText(expectedText);
    }

    /**
     * Повна дія: відкрити нову вкладку та перевірити контент
     * @param expectedText Очікуваний текст на новій вкладці
     */
    async openNewWindowAndExpectContent(expectedText: string): Promise<void> {
        const newPage = await this.openNewWindow();
        await this.expectNewWindowContent(newPage, expectedText);
    }
}
