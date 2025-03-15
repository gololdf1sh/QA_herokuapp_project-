import { Page, Locator, expect } from '@playwright/test';

export class DynamicControlsPage {
    readonly page: Page;
    readonly checkbox: Locator;
    readonly toggleCheckboxButton: Locator;
    readonly message: Locator;
    readonly inputField: Locator;
    readonly toggleInputButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkbox = page.locator('#checkbox');
        this.toggleCheckboxButton = page.locator('#checkbox-example button');
        this.message = page.locator('#message');
        this.inputField = page.locator('#input-example input');
        this.toggleInputButton = page.locator('#input-example button');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    }

    async removeCheckbox() {
        await this.toggleCheckboxButton.click();
        await this.message.waitFor(); // Чекаємо на повідомлення
    }

    async addCheckbox() {
        await this.toggleCheckboxButton.click();
        await this.checkbox.waitFor(); // Чекаємо появи чекбокса
    }

    async enableInput() {
        await this.toggleInputButton.click();
        await expect(this.inputField).toBeEnabled();
    }

    async disableInput() {
        await this.toggleInputButton.click();
        await expect(this.inputField).toBeDisabled();
    }

    async assertMessageText(expectedText: string) {
        await expect(this.message).toHaveText(expectedText);
    }

    async assertCheckboxVisible(visible: boolean) {
        if (visible) {
            await expect(this.checkbox).toBeVisible();
        } else {
            await expect(this.checkbox).toBeHidden();
        }
    }
}
