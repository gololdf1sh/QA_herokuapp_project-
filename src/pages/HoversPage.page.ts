import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Hovers
 */
export class HoversPage {
    readonly page: Page;

    // Приватні локатори
    private figureImages: Locator;
    private figureCaptions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.figureImages = page.locator('.figure'); // аватарки
        this.figureCaptions = page.locator('.figcaption'); // підписи, що з'являються при наведенні
    }

    /**
     * Перехід на сторінку Hovers
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/hovers');
    }

    /**
     * Навести курсор на конкретне зображення
     * @param index Індекс елементу (починається з 0)
     */
    async hoverOverFigure(index: number): Promise<void> {
        await this.figureImages.nth(index).hover();
    }

    /**
     * Отримати текст підпису під фігурою
     * @param index Індекс елементу
     * @returns Текст підпису
     */
    async getCaptionText(index: number): Promise<string> {
        return await this.figureCaptions.nth(index).innerText();
    }

    /**
     * Перевірка: підпис відображається та містить очікуваний текст
     * @param index Індекс елементу
     * @param expectedText Очікуваний текст у підписі
     */
    async expectCaption(index: number, expectedText: string): Promise<void> {
        const caption = this.figureCaptions.nth(index);

        await expect(caption, `Caption for figure ${index} is not visible`).toBeVisible();
        await expect(caption, `Caption text mismatch for figure ${index}`).toContainText(expectedText);
    }

    /**
     * Повна дія: навести курсор і перевірити підпис
     * @param index Індекс фігури
     * @param expectedText Очікуваний текст підпису
     */
    async hoverOverFigureAndExpectCaption(index: number, expectedText: string): Promise<void> {
        await this.hoverOverFigure(index);
        await this.expectCaption(index, expectedText);
    }
}
