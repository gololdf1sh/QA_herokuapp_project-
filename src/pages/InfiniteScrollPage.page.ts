import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Infinite Scroll
 */
export class InfiniteScrollPage {
    readonly page: Page;

    // Приватні локатори
    private paragraphs: Locator;

    constructor(page: Page) {
        this.page = page;
        this.paragraphs = page.locator('.jscroll-added'); // параграфи, що додаються при скролі
    }

    /**
     * Перехід на сторінку Infinite Scroll
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/infinite_scroll');
    }

    /**
     * Отримати кількість параграфів на сторінці
     * @returns Кількість параграфів
     */
    async getParagraphsCount(): Promise<number> {
        return await this.paragraphs.count();
    }

    /**
     * Проскролити сторінку вниз на вказану кількість пікселів
     * @param pixels Кількість пікселів для прокрутки (за замовчуванням 1000)
     */
    async scrollDown(pixels: number = 1000): Promise<void> {
        await this.page.evaluate((scrollY) => {
            window.scrollBy(0, scrollY);
        }, pixels);

        // Чекаємо завантаження контенту
        await this.page.waitForTimeout(1000); // можна замінити на чек presence елементу
    }

    /**
     * Очікувати, що кількість параграфів дорівнює очікуваному значенню
     * @param expectedCount Очікувана кількість параграфів
     */
    async expectParagraphsCount(expectedCount: number): Promise<void> {
        await expect(this.paragraphs, 'Параграфи не відповідають очікуваній кількості').toHaveCount(expectedCount, {
            timeout: 10000
        });
    }

    /**
     * Інтегрована дія: проскролити вниз і перевірити кількість параграфів
     * @param pixels Кількість пікселів для прокрутки
     * @param expectedCount Очікувана кількість параграфів після скролу
     */
    async scrollDownAndExpectParagraphs(pixels: number, expectedCount: number): Promise<void> {
        await this.scrollDown(pixels);
        await this.expectParagraphsCount(expectedCount);
    }
}
