import { Page, Locator, expect } from '@playwright/test';

export class JavaScriptAlertsPage {
    readonly page: Page;
    readonly jsAlertButton: Locator;
    readonly jsConfirmButton: Locator;
    readonly jsPromptButton: Locator;
    readonly resultText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.jsAlertButton = page.locator('button[onclick="jsAlert()"]');
        this.jsConfirmButton = page.locator('button[onclick="jsConfirm()"]');
        this.jsPromptButton = page.locator('button[onclick="jsPrompt()"]');
        this.resultText = page.locator('#result');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    }

    async triggerAlertAndAccept() {
        this.page.once('dialog', async (dialog) => {
            expect(dialog.message()).toBe('I am a JS Alert');
            await dialog.accept();
        });
        await this.jsAlertButton.click();
    }

    async triggerConfirm(accept: boolean) {
        this.page.once('dialog', async (dialog) => {
            expect(dialog.message()).toBe('I am a JS Confirm');
            if (accept) {
                await dialog.accept();
            } else {
                await dialog.dismiss();
            }
        });
        await this.jsConfirmButton.click();
    }

    async triggerPrompt(inputText: string | null) {
        this.page.once('dialog', async (dialog) => {
            expect(dialog.message()).toBe('I am a JS prompt');
            if (inputText !== null) {
                await dialog.accept(inputText);
            } else {
                await dialog.dismiss();
            }
        });
        await this.jsPromptButton.click();
    }

    async assertResult(expected: string) {
        await expect(this.resultText).toHaveText(expected);
    }
}
