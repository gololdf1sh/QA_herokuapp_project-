import { expect, Page, Locator } from '@playwright/test';

export class TyposPage {
    readonly page: Page;
    readonly paragraphLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.paragraphLocator = page.locator('div.example p:nth-child(2)');
    }

    // Перехід на сторінку
    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/typos');
    }

    // Отримати текст з другого параграфу
    async getSecondParagraphText(): Promise<string> {
        return await this.paragraphLocator.innerText();
    }

    /**
     * Перевірка правильного тексту з кількома спробами
     * @param retries - кількість спроб
     */
    async waitForCorrectText(retries: number = 10): Promise<{ success: boolean; lastText: string }> {
        const expectedText = `Sometimes you'll see a typo, other times you won't.`;
        let lastText = '';

        for (let i = 1; i <= retries; i++) {
            lastText = await this.getSecondParagraphText();

            console.log(`📝 Attempt ${i}: "${lastText}"`);

            if (lastText.trim() === expectedText) {
                console.log(`✅ Correct text found on attempt ${i}`);
                return { success: true, lastText };
            }

            // Перезавантажуємо сторінку для нової спроби
            await this.page.reload();
        }

        console.warn(`❌ Text did not match after ${retries} attempts. Last attempt: "${lastText}"`);
        return { success: false, lastText };
    }
}
