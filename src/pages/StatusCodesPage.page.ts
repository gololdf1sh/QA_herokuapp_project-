import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Status Codes
 */
export class StatusCodesPage {
    readonly page: Page;

    // Приватні локатори
    private statusLinks: Locator;
    private statusText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.statusLinks = page.locator('.example ul li a');
        this.statusText = page.locator('.example p');
    }

    /**
     * Перехід на сторінку Status Codes
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/status_codes');
    }

    /**
     * Клік по лінку статусу за кодом (наприклад, 404)
     * @param statusCode Код статусу (наприклад, "404")
     */
    async clickStatusCodeLink(statusCode: string): Promise<void> {
        const link = this.statusLinks.filter({ hasText: statusCode });
        await expect(link, `Посилання з кодом ${statusCode} не знайдено`).toBeVisible();
        await link.click();
    }

    /**
     * Перевірити, що текст містить очікуване повідомлення
     * @param expectedText Очікуваний фрагмент тексту
     */
    async expectStatusTextContains(expectedText: string): Promise<void> {
        await expect(this.statusText, 'Текст не містить очікуваного фрагменту')
            .toContainText(expectedText);
    }

    /**
     * Повернутись назад до списку статус кодів
     */
    async goBack(): Promise<void> {
        await this.page.goBack();
    }

    /**
     * Повна дія: клікнути по коду, перевірити текст і повернутись назад
     * @param statusCode Код статусу (наприклад, "404")
     * @param expectedText Очікуваний текст для перевірки
     */
    async clickStatusCodeAndExpect(statusCode: string, expectedText: string): Promise<void> {
        await this.clickStatusCodeLink(statusCode);
        await this.expectStatusTextContains(expectedText);
        await this.goBack();
    }
}
