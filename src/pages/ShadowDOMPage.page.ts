import { Page, Locator, expect } from '@playwright/test';

export class ShadowDOMPage {
    readonly page: Page;
    readonly firstShadowParagraph: Locator;
    readonly secondShadowParagraph: Locator;

    constructor(page: Page) {
        this.page = page;

        // Два елементи з Shadow DOM
        this.firstShadowParagraph = page.locator('my-paragraph').nth(0);
        this.secondShadowParagraph = page.locator('my-paragraph').nth(1);
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/shadowdom');
    }

    async assertFirstShadowParagraph(expectedText: string) {
        await expect(this.firstShadowParagraph).toContainText(expectedText);
    }

    async assertSecondShadowParagraphContains(expectedTexts: string[]) {
        for (const text of expectedTexts) {
            await expect(this.secondShadowParagraph).toContainText(text);
        }
    }

    // Додаткова утиліта, якщо потрібно перевірити весь текст
    async logSecondParagraphText() {
        const text = await this.secondShadowParagraph.innerText();
        console.log('Second Paragraph Full Text:', text);
    }
}
