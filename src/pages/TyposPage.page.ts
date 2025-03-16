import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Typos
 */
export class TyposPage {
    readonly page: Page;

    private paragraph: Locator;

    constructor(page: Page) {
        this.page = page;
        this.paragraph = page.locator('.example p').nth(1);
    }

    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/typos');
    }

    async getParagraphText(): Promise<string> {
        return await this.paragraph.innerText();
    }

    /**
     * Перевірка, що текст абзацу відповідає одному з допустимих варіантів
     * @param expectedTexts Масив можливих коректних текстів
     */
    async expectCorrectedText(expectedTexts: string[]): Promise<void> {
        const actualText = await this.getParagraphText();

        expect(
            expectedTexts,
            'Текст не входить до списку припустимих варіантів'
        ).toContain(actualText.trim());
    }
}
