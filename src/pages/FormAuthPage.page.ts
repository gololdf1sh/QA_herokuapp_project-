import { Page, Locator, expect } from '@playwright/test';

export class FormAuthPage {
    readonly page: Page;
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private logoutButton: Locator;
    private flashMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('button[type="submit"]');
        this.logoutButton = page.locator('a[href="/logout"]');
        this.flashMessage = page.locator('#flash');
    }

    /**
     * Перейти на сторінку логіну
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/login');
    }

    /**
     * Виконати логін
     */
    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Виконати логаут
     */
    async logout(): Promise<void> {
        await this.logoutButton.click();
    }

    /**
     * Перевірити видимість кнопки Logout
     */
    async assertLogoutButtonVisible(): Promise<void> {
        await expect(this.logoutButton).toBeVisible();
    }

    /**
     * Перевірити, що кнопка Logout не відображається (ми не авторизовані)
     */
    async assertLogoutButtonHidden(): Promise<void> {
        await expect(this.logoutButton).toBeHidden();
    }

    /**
     * Перевірити повідомлення (успішний логін/вихід або помилка)
     */
    async assertFlashMessageContains(expectedText: string): Promise<void> {
        const message = (await this.flashMessage.textContent())?.trim();
        expect(message).toContain(expectedText);
    }
}
