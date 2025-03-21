import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Basic Auth
 */
export class BasicAuthPage {
    readonly page: Page;

    /**
     * Локатор повідомлення про успішну авторизацію
     */
    private successMessage: Locator;

    /**
     * Конструктор класу BasicAuthPage
     * @param page - об'єкт Playwright Page
     */
    constructor(page: Page) {
        this.page = page;
        this.successMessage = page.locator('p');
    }

    /**
     * Перехід на сторінку Basic Auth з авторизацією
     * @param username - Ім'я користувача
     * @param password - Пароль
     */
    async goto(username: string, password: string): Promise<void> {
        const authUrl = `https://${username}:${password}@the-internet.herokuapp.com/basic_auth`;
        await this.page.goto(authUrl);
    }

    /**
     * Перевіряє повідомлення про успішну авторизацію
     */
    async expectSuccessMessage(): Promise<void> {
        const message = await this.successMessage.textContent();
        expect(message).toContain('Congratulations! You must have the proper credentials.');
    }

    /**
     * Перевіряє статус-код при неуспішній авторизації
     * @param username - Ім'я користувача
     * @param password - Пароль
     */
    async expectUnauthorized(username: string, password: string): Promise<void> {
        const authUrl = `https://${username}:${password}@the-internet.herokuapp.com/basic_auth`;

        const response = await this.page.goto(authUrl);
        expect(response?.status()).toBe(401);
    }
}
