import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою JavaScript Alerts
 */
export class JavaScriptAlertsPage {
    readonly page: Page;

    // Приватні локатори
    private jsAlertButton: Locator;
    private jsConfirmButton: Locator;
    private jsPromptButton: Locator;
    private resultText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.jsAlertButton = page.locator('button[onclick="jsAlert()"]');
        this.jsConfirmButton = page.locator('button[onclick="jsConfirm()"]');
        this.jsPromptButton = page.locator('button[onclick="jsPrompt()"]');
        this.resultText = page.locator('#result');
    }

    /**
     * Перехід на сторінку JavaScript Alerts
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    }

    /**
     * Викликає JS Alert і приймає його
     */
    async triggerAlertAndAccept(): Promise<void> {
        this.page.once('dialog', async (dialog) => {
            await expect(dialog.message(), 'Неправильне повідомлення alert').toBe('I am a JS Alert');
            await dialog.accept();
        });

        await this.jsAlertButton.click();
    }

    /**
     * Викликає JS Confirm і приймає/відхиляє залежно від параметра
     * @param accept true - прийняти; false - відхилити
     */
    async triggerConfirm(accept: boolean): Promise<void> {
        this.page.once('dialog', async (dialog) => {
            await expect(dialog.message(), 'Неправильне повідомлення confirm').toBe('I am a JS Confirm');

            if (accept) {
                await dialog.accept();
            } else {
                await dialog.dismiss();
            }
        });

        await this.jsConfirmButton.click();
    }

    /**
     * Викликає JS Prompt, вводить текст або відхиляє
     * @param inputText Текст, який ввести. Якщо null - відхиляє prompt
     */
    async triggerPrompt(inputText: string | null): Promise<void> {
        this.page.once('dialog', async (dialog) => {
            await expect(dialog.message(), 'Неправильне повідомлення prompt').toBe('I am a JS prompt');

            if (inputText !== null) {
                await dialog.accept(inputText);
            } else {
                await dialog.dismiss();
            }
        });

        await this.jsPromptButton.click();
    }

    /**
     * Перевіряє результат повідомлення під кнопками
     * @param expected Очікуваний текст результату
     */
    async expectResult(expected: string): Promise<void> {
        await expect(this.resultText, 'Неправильний текст результату').toHaveText(expected);
    }

    /**
     * Повна дія: викликає Alert, приймає його і перевіряє результат
     * @param expected Очікуваний текст результату після взаємодії
     */
    async triggerAlertAndExpectResult(expected: string): Promise<void> {
        await this.triggerAlertAndAccept();
        await this.expectResult(expected);
    }

    /**
     * Повна дія: викликає Confirm, обирає дію і перевіряє результат
     * @param accept true - прийняти; false - відхилити
     * @param expected Очікуваний результат після взаємодії
     */
    async triggerConfirmAndExpectResult(accept: boolean, expected: string): Promise<void> {
        await this.triggerConfirm(accept);
        await this.expectResult(expected);
    }

    /**
     * Повна дія: викликає Prompt, вводить текст/скасовує і перевіряє результат
     * @param inputText Текст, який ввести або null для скасування
     * @param expected Очікуваний результат після взаємодії
     */
    async triggerPromptAndExpectResult(inputText: string | null, expected: string): Promise<void> {
        await this.triggerPrompt(inputText);
        await this.expectResult(expected);
    }
}
