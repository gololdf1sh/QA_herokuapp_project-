import { Page, Locator } from '@playwright/test';

export class DigestAuthPage {
    readonly page: Page;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // Локатор для абзацу з успішним повідомленням
        this.successMessage = page.locator('p');
    }

    async navigate() {
        await this.page.goto('https://the-internet.herokuapp.com/digest_auth');
    }

    async getSuccessMessage() {
        // Отримуємо текст саме з абзацу
        return this.successMessage.textContent();
    }
}
