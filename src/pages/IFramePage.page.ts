import { Page, FrameLocator, Locator, expect } from '@playwright/test';

export class IFramePage {
    readonly page: Page;
    readonly frame: FrameLocator;
    readonly editorBody: Locator;

    constructor(page: Page) {
        this.page = page;
        this.frame = page.frameLocator('#mce_0_ifr');
        this.editorBody = this.frame.locator('body');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/iframe');
    }

    async clearEditor() {
        await this.editorBody.evaluate((body) => {
            body.innerHTML = '';  // Важливо! Ми редагуємо вміст напряму
        });
    }

    async enterText(text: string) {
        await this.editorBody.evaluate((body, newText) => {
            body.innerHTML = newText;
        }, text);
    }

    async getEditorText(): Promise<string> {
        return await this.editorBody.innerText();
    }

    async assertEditorText(expectedText: string) {
        const actualText = await this.getEditorText();
        expect(actualText.trim()).toBe(expectedText);
    }
}
