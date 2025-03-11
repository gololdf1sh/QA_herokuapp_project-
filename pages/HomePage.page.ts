import { Page, expect } from '@playwright/test';

/**
 * Клас для взаємодії з головною сторінкою застосунку
 */
export class HomePage {
    page: Page; // Основний об'єкт сторінки Playwright

    /**
     * Мапа доступних сторінок із відносними URL
     * Використовується для навігації та перевірок URL
     */
    links = {
        abTest: '/abtest',
        addRemoveElements: '/add_remove_elements/',
        brokenImages: '/broken_images'
    };

    /**
     * Ініціалізація класу HomePage
     * @param page - об'єкт сторінки Playwright
     */
    constructor(page: Page) {
        this.page = page; // Зберігаємо передану сторінку
    }

    /**
     * Перехід на головну сторінку
     */
    async goto(): Promise<void> {
        await this.page.goto('/');
    }

    /**
     * Перехід за посиланням на вказану сторінку
     *
     * @param pageKey - ключ із об'єкта links, наприклад 'abTest'
     * @returns Promise<void>
     */
    async navigateToPage(pageKey: string): Promise<void> {
        // Шукаємо елемент <a> за атрибутом href і клікаємо по ньому
        await this.page.locator(`a[href='${this.links[pageKey]}']`).click();
    }

    /**
     * Перевірка, що URL сторінки співпадає з очікуваним шляхом
     *
     * @param pageKey - ключ із об'єкта links (який шлях очікуємо)
     * @returns Promise<void>
     */
    async checkURL(pageKey: string): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(this.links[pageKey]));
    }
}
