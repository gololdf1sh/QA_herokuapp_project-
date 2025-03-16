import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Shadow DOM
 */
export class ShadowDOMPage {
    readonly page: Page;

    // Приватні локатори для Shadow DOM елементів
    private firstShadowParagraph: Locator;
    private secondShadowParagraph: Locator;

    constructor(page: Page) {
        this.page = page;

        // Shadow DOM елементи знаходяться всередині custom elements
        this.firstShadowParagraph = page.locator('my-paragraph').nth(0);
        this.secondShadowParagraph = page.locator('my-paragraph').nth(1);
    }

    /**
     * Перехід на сторінку Shadow DOM
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/shadowdom');
    }

    /**
     * Перевіряє текст у першому Shadow DOM параграфі
     * @param expectedText Очікуваний текст
     */
    async expectFirstShadowParagraph(expectedText: string): Promise<void> {
        await expect(this.firstShadowParagraph, 'Текст першого параграфа не співпадає')
            .toContainText(expectedText);
    }

    /**
     * Перевіряє, що другий параграф містить всі передані значення
     * @param expectedTexts Масив очікуваних значень, які мають бути в тексті
     */
    async expectSecondShadowParagraphContains(expectedTexts: string[]): Promise<void> {
        for (const text of expectedTexts) {
            await expect(this.secondShadowParagraph, `Другий параграф не містить текст: "${text}"`)
                .toContainText(text);
        }
    }

    /**
     * Перевіряє тексти обох параграфів у Shadow DOM
     * @param expectedFirstText Текст першого параграфа
     * @param expectedSecondTexts Масив текстів, які мають міститись у другому параграфі
     */
    async expectShadowParagraphs(expectedFirstText: string, expectedSecondTexts: string[]): Promise<void> {
        await this.expectFirstShadowParagraph(expectedFirstText);
        await this.expectSecondShadowParagraphContains(expectedSecondTexts);
    }

    /**
     * Отримує повний текст другого параграфа
     * @returns Текст параграфа як рядок
     */
    async getSecondParagraphText(): Promise<string> {
        return await this.secondShadowParagraph.innerText();
    }
}
