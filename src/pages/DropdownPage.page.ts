import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Dropdown
 */
export class DropdownPage {
    readonly page: Page;

    /**
     * Локатор для елемента дропдауну
     */
    private dropdown: Locator;

    /**
     * Конструктор класу DropdownPage
     * @param page - об'єкт Playwright Page
     */
    constructor(page: Page) {
        this.page = page;
        this.dropdown = page.locator('#dropdown');
    }

    /**
     * Перехід на сторінку Dropdown
     */
    async goto(): Promise<void> {
        await this.page.goto('/dropdown');
    }

    /**
     * Вибирає опцію за видимим текстом або значенням
     * @param value - значення опції (Option 1 ➔ '1', Option 2 ➔ '2')
     */
    async selectOptionByValue(value: string): Promise<void> {
        await this.dropdown.selectOption(value);
    }

    /**
     * Перевіряє, що опція вибрана
     * @param expectedValue - значення вибраної опції (Option 1 ➔ '1', Option 2 ➔ '2')
     */
    async expectSelectedOptionValue(expectedValue: string): Promise<void> {
        await expect(this.dropdown).toHaveValue(expectedValue);
    }
}
