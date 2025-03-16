import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Checkboxes
 */
export class CheckBoxesPage {
    readonly page: Page;

    /**
     * Локатор для всіх чекбоксів на сторінці
     */
    private checkboxes: Locator;

    /**
     * Конструктор класу CheckBoxesPage
     * @param page - об'єкт Playwright Page
     */
    constructor(page: Page) {
        this.page = page;
        this.checkboxes = page.locator('form#checkboxes input[type="checkbox"]');
    }

    /**
     * Перехід на сторінку Checkboxes
     */
    async goto(): Promise<void> {
        await this.page.goto('/checkboxes');
    }

    /**
     * Активує або деактивує чекбокс за індексом
     * @param index - індекс чекбоксу (починаючи з 0)
     * @param shouldBeChecked - чи повинен бути чекбокс обраним
     */
    async setCheckboxState(index: number, shouldBeChecked: boolean): Promise<void> {
        const checkbox = this.checkboxes.nth(index);
        const isChecked = await checkbox.isChecked();

        if (shouldBeChecked !== isChecked) {
            await checkbox.click();
        }
    }

    /**
     * Перевіряє стан чекбоксу за індексом
     * @param index - індекс чекбоксу
     * @param expectedState - очікуваний стан (true/false)
     */
    async expectCheckboxState(index: number, expectedState: boolean): Promise<void> {
        const checkbox = this.checkboxes.nth(index);
        await expect(checkbox).toHaveJSProperty('checked', expectedState);
    }

    /**
     * Перевіряє кількість чекбоксів на сторінці
     * @param expectedCount - очікувана кількість
     */
    async expectCheckboxCount(expectedCount: number): Promise<void> {
        const count = await this.checkboxes.count();
        expect(count).toBe(expectedCount);
    }
}
