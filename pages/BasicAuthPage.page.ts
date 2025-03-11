import { Page, BrowserContext, Locator } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Basic Auth
 */
export class BasicAuthPage {
    private page: Page;                  // Об'єкт сторінки Playwright
    private context: BrowserContext;     // Контекст браузера для роботи з автентифікацією

    private successMessage: Locator;     // Локатор повідомлення про успішну авторизацію
    private errorMessage: Locator;       // Локатор повідомлення про помилку або відсутність доступу

    /**
     * Ініціалізація класу BasicAuthPage
     * @param page - об'єкт сторінки Playwright
     * @param context - контекст браузера для роботи з автентифікацією
     */
    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;

        // Локатор успішного повідомлення (якщо вхід вдалий)
        this.successMessage = this.page.locator('p');

        // Локатор всього body (для перевірки повідомлень про помилку або інших повідомлень)
        this.errorMessage = this.page.locator('body');
    }

    /**
     * Перехід на сторінку з Basic Auth
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/basic_auth');
    }

    /**
     * Отримання тексту повідомлення про успішну автентифікацію
     * @returns текст успішного повідомлення (типу string)
     */
    async getSuccessMessageText(): Promise<string | null> {
        return await this.successMessage.textContent();
    }

    /**
     * Отримання тексту повідомлення про помилку автентифікації
     * @returns текст повідомлення про помилку (типу string)
     */
    async getErrorMessageText(): Promise<string | null> {
        return await this.errorMessage.textContent();
    }
}
