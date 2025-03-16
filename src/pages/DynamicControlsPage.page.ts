import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Dynamic Controls
 */
export class DynamicControlsPage {
    readonly page: Page;

    private checkbox: Locator;
    private removeAddButton: Locator;
    private enableDisableButton: Locator;
    private inputField: Locator;
    private message: Locator;

    constructor(page: Page) {
        this.page = page;

        this.checkbox = page.locator('#checkbox');
        this.removeAddButton = page.locator('#checkbox-example button');
        this.enableDisableButton = page.locator('#input-example button');
        this.inputField = page.locator('#input-example input');
        this.message = page.locator('#message');
    }

    /**
     * Перехід на сторінку Dynamic Controls
     */
    async goto(): Promise<void> {
        await this.page.goto('/dynamic_controls');
    }

    /**
     * Натискає кнопку для видалення/додавання чекбоксу
     */
    async clickRemoveAddButton(): Promise<void> {
        await this.removeAddButton.click();
    }

    /**
     * Натискає кнопку для увімкнення/вимкнення input
     */
    async clickEnableDisableButton(): Promise<void> {
        await this.enableDisableButton.click();
    }

    /**
     * Перевіряє, що чекбокс відсутній
     */
    async expectCheckboxIsGone(): Promise<void> {
        await expect(this.checkbox).toBeHidden();
        await expect(this.message).toHaveText('It\'s gone!');
    }

    /**
     * Перевіряє, що чекбокс знову з’явився
     */
    async expectCheckboxIsBack(): Promise<void> {
        await expect(this.checkbox).toBeVisible();
        await expect(this.message).toHaveText('It\'s back!');
    }

    /**
     * Перевіряє, що input увімкнений
     */
    async expectInputIsEnabled(): Promise<void> {
        await expect(this.inputField).toBeEnabled();
        await expect(this.message).toHaveText('It\'s enabled!');
    }

    /**
     * Перевіряє, що input вимкнений
     */
    async expectInputIsDisabled(): Promise<void> {
        await expect(this.inputField).toBeDisabled();
        await expect(this.message).toHaveText('It\'s disabled!');
    }
}
