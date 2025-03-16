import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Digest Auth
 */
export class DigestAuthPage {
    readonly page: Page;

    /**
     * Локатор для повідомлення про успішну авторизацію
     */
    private successMessage: Locator;

    /**
     * Конструктор класу DigestAuthPage
     * @param page - об'єкт Playwright Page
     */
    constructor(page: Page) {
        this.page = page;
        this.successMessage = page.locator('div.example p');
    }

    /**
     * Перехід на сторінку Digest Auth з авторизацією
     * @param username - Ім'я користувача
     * @param password - Пароль
     */
    async goto(username: string, password: string): Promise<void> {
        const authUrl = `https://${username}:${password}@the-internet.herokuapp.com/digest_auth`;
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
     * Перевіряє статус-код при неправильних даних (401)
     * @param username - Ім'я користувача
     * @param password - Пароль
     */
    async expectUnauthorized(username: string, password: string): Promise<void> {
        const authUrl = `https://${username}:${password}@the-internet.herokuapp.com/digest_auth`;

        const response = await this.page.goto(authUrl);
        expect(response?.status()).toBe(401);
    }
}
