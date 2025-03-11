import { Page, Locator } from '@playwright/test';

/**
 * Клас BasicAuthPage відповідає за взаємодію зі сторінкою Basic Authentication.
 *
 * ✅ Відповідальність:
 * - Навігація на сторінку.
 * - Отримання повідомлень про успіх / помилку.
 *
 * ❗️Контекст і авторизацію робимо на рівні тестів.
 */
export class BasicAuthPage {
    private page: Page;

    // ✅ Локатори для елементів на сторінці
    private successMessage: Locator;
    private errorMessage: Locator;

    /**
     * Конструктор класу BasicAuthPage.
     * @param page - об'єкт сторінки Playwright.
     */
    constructor(page: Page) {
        this.page = page;

        // ✅ Локатор успішного повідомлення (видно після авторизації)
        this.successMessage = this.page.locator('p');

        // ✅ Локатор всього body (можна шукати будь-які повідомлення про помилку або недоступність)
        this.errorMessage = this.page.locator('body');
    }

    /**
     * Перехід на сторінку Basic Authentication.
     * URL захищено базовою авторизацією.
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/basic_auth');
    }

    /**
     * Отримати текст повідомлення про успішну автентифікацію.
     * @returns текст повідомлення або null.
     */
    async getSuccessMessageText(): Promise<string | null> {
        return await this.successMessage.textContent();
    }

    /**
     * Отримати текст повідомлення про помилку або відсутність доступу.
     * @returns текст повідомлення або null.
     */
    async getErrorMessageText(): Promise<string | null> {
        return await this.errorMessage.textContent();
    }
}
