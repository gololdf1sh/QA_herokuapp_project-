import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Inputs
 */
export class InputsPage {
    readonly page: Page;

    // Приватний локатор
    private numberInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.numberInput = page.locator('input[type="number"]');
    }

    /**
     * Перехід на сторінку Inputs
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/inputs');
    }

    /**
     * Ввести значення в поле number
     * @param value Значення для вводу
     */
    async enterValue(value: string): Promise<void> {
        await this.numberInput.fill(''); // очищуємо поле перед вводом
        await this.numberInput.type(value);
    }

    /**
     * Перевірити значення у полі вводу
     * @param expectedValue Очікуване значення
     */
    async expectValue(expectedValue: string): Promise<void> {
        const inputValue = await this.numberInput.inputValue();
        await expect(inputValue, `Очікуване значення має бути ${expectedValue}`).toBe(expectedValue);
    }

    /**
     * Натискати клавішу ArrowUp певну кількість разів
     * @param times Кількість натискань (за замовчуванням 1)
     */
    async incrementUsingArrowUp(times: number = 1): Promise<void> {
        for (let i = 0; i < times; i++) {
            await this.numberInput.press('ArrowUp');
        }
    }

    /**
     * Натискати клавішу ArrowDown певну кількість разів
     * @param times Кількість натискань (за замовчуванням 1)
     */
    async decrementUsingArrowDown(times: number = 1): Promise<void> {
        for (let i = 0; i < times; i++) {
            await this.numberInput.press('ArrowDown');
        }
    }

    /**
     * Інтегрована дія: ввести значення і перевірити його
     * @param value Значення для вводу
     */
    async enterValueAndExpect(value: string): Promise<void> {
        await this.enterValue(value);
        await this.expectValue(value);
    }
}
