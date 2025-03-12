import { Page, Locator } from '@playwright/test';

// Клас для сторінки чекбоксів
export class CheckBoxesPage {
    readonly page: Page;
    readonly checkbox1: Locator;
    readonly checkbox2: Locator;

    constructor(page: Page) {
        this.page = page;
        // Локатори чекбоксів
        this.checkbox1 = page.locator('form#checkboxes input').nth(0);
        this.checkbox2 = page.locator('form#checkboxes input').nth(1);
    }

    // Відкриття сторінки чекбоксів
    async open() {
        await this.page.goto('https://the-internet.herokuapp.com/checkboxes');
    }

    // Перевіряємо, чи чекбокс вибраний
    async isCheckbox1Checked(): Promise<boolean> {
        return this.checkbox1.isChecked();
    }

    async isCheckbox2Checked(): Promise<boolean> {
        return this.checkbox2.isChecked();
    }

    // Тиснемо на чекбокси
    async toggleCheckbox1() {
        await this.checkbox1.click();
    }

    async toggleCheckbox2() {
        await this.checkbox2.click();
    }
}
