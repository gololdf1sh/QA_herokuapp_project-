import { Page, Locator, expect } from '@playwright/test';

export class InputsPage {
    readonly page: Page;
    readonly numberInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.numberInput = page.locator('input[type="number"]');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/inputs');
    }

    async enterValue(value: string) {
        await this.numberInput.fill(''); // очищуємо поле перед вводом
        await this.numberInput.type(value);
    }

    async assertValue(expectedValue: string) {
        const inputValue = await this.numberInput.inputValue();
        expect(inputValue).toBe(expectedValue);
    }

    async incrementUsingArrowUp(times: number = 1) {
        for (let i = 0; i < times; i++) {
            await this.numberInput.press('ArrowUp');
        }
    }

    async decrementUsingArrowDown(times: number = 1) {
        for (let i = 0; i < times; i++) {
            await this.numberInput.press('ArrowDown');
        }
    }
}
