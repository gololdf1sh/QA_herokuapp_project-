import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Add/Remove Elements
 */
export class AddRemoveElementsPage {
    private page: Page;                // Об'єкт сторінки Playwright
    private addButton: Locator;        // Локатор для кнопки "Add Element"
    private deleteButtons: Locator;    // Локатор для всіх кнопок "Delete"

    /**
     * Ініціалізація класу AddRemoveElementsPage
     * @param page - об'єкт сторінки Playwright
     */
    constructor(page: Page) {
        this.page = page;

        // Ініціалізація локатора кнопки "Add Element"
        this.addButton = this.page.getByRole('button', { name: 'Add Element' });

        // Ініціалізація локатора всіх кнопок "Delete"
        this.deleteButtons = this.page.getByRole('button', { name: 'Delete' });
    }

    /**
     * Перехід на сторінку "Add/Remove Elements"
     */
    async goto(): Promise<void> {
        await this.page.goto('/add_remove_elements/');
    }

    /**
     * Додавання певної кількості елементів на сторінку
     * @param count - кількість елементів, які потрібно додати
     */
    async addElements(count: number): Promise<void> {
        for (let i = 0; i < count; i++) {
            await this.addButton.click(); // Клік по кнопці "Add Element"
        }
    }

    /**
     * Видалення певної кількості елементів зі сторінки
     * @param count - кількість елементів, які потрібно видалити
     */
    async deleteElements(count: number): Promise<void> {
        for (let i = 0; i < count && (await this.getDeleteButtonCount()) > 0; i++) {
            // Завжди видаляємо перший елемент у списку
            await this.deleteButtons.nth(0).click();
        }
    }

    /**
     * Отримання кількості кнопок "Delete" на сторінці
     * @returns кількість кнопок "Delete"
     */
    async getDeleteButtonCount(): Promise<number> {
        return this.deleteButtons.count();
    }

    /**
     * Перевірка кількості кнопок "Delete" на сторінці
     * @param expectedCount - очікувана кількість кнопок "Delete"
     */
    async checkDeleteButtonCount(expectedCount: number): Promise<void> {
        await expect(this.deleteButtons).toHaveCount(expectedCount);
    }
}
