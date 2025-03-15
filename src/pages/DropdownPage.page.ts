import { Page, Locator, expect } from '@playwright/test';

export class DropdownPage {
    readonly page: Page;
    readonly dropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dropdown = page.locator('#dropdown');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/dropdown');
    }

    async selectOptionByValue(value: string) {
        await this.dropdown.selectOption(value);
    }

    async assertSelectedOptionText(expectedText: string) {
        const selectedOption = this.dropdown.locator('option:checked');
        await expect(selectedOption).toHaveText(expectedText);
    }
}
