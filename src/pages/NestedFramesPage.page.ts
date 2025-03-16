import { Page, FrameLocator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Nested Frames
 */
export class NestedFramesPage {
    readonly page: Page;

    // Приватні локатори для фреймів
    private frameTop: FrameLocator;
    private frameLeft: FrameLocator;
    private frameMiddle: FrameLocator;
    private frameRight: FrameLocator;
    private frameBottom: FrameLocator;

    constructor(page: Page) {
        this.page = page;
        this.frameTop = page.frameLocator('frame[name="frame-top"]');
        this.frameLeft = this.frameTop.frameLocator('frame[name="frame-left"]');
        this.frameMiddle = this.frameTop.frameLocator('frame[name="frame-middle"]');
        this.frameRight = this.frameTop.frameLocator('frame[name="frame-right"]');
        this.frameBottom = page.frameLocator('frame[name="frame-bottom"]');
    }

    /**
     * Перехід на сторінку Nested Frames
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/nested_frames');
    }

    /**
     * Отримати текст з лівого фрейму
     */
    async getLeftFrameText(): Promise<string> {
        return await this.frameLeft.locator('body').innerText();
    }

    /**
     * Отримати текст з середнього фрейму
     */
    async getMiddleFrameText(): Promise<string> {
        return await this.frameMiddle.locator('body').innerText();
    }

    /**
     * Отримати текст з правого фрейму
     */
    async getRightFrameText(): Promise<string> {
        return await this.frameRight.locator('body').innerText();
    }

    /**
     * Отримати текст з нижнього фрейму
     */
    async getBottomFrameText(): Promise<string> {
        return await this.frameBottom.locator('body').innerText();
    }

    /**
     * Перевіряє текст у вказаному фреймі
     * @param frame Назва фрейму: left, middle, right, bottom
     * @param expectedText Очікуваний текст
     */
    async expectFrameText(frame: string, expectedText: string): Promise<void> {
        let actualText = '';

        switch (frame) {
            case 'left':
                actualText = await this.getLeftFrameText();
                break;
            case 'middle':
                actualText = await this.getMiddleFrameText();
                break;
            case 'right':
                actualText = await this.getRightFrameText();
                break;
            case 'bottom':
                actualText = await this.getBottomFrameText();
                break;
            default:
                throw new Error(`Frame ${frame} не знайдено`);
        }

        expect(actualText.trim(), `Текст у фреймі ${frame} не співпадає`)
            .toBe(expectedText);
    }

    /**
     * Перевірити всі фрейми за раз
     * @param expectedTexts Об'єкт з очікуваними значеннями для кожного фрейму
     */
    async expectAllFramesTexts(expectedTexts: {
        left: string,
        middle: string,
        right: string,
        bottom: string
    }): Promise<void> {
        await this.expectFrameText('left', expectedTexts.left);
        await this.expectFrameText('middle', expectedTexts.middle);
        await this.expectFrameText('right', expectedTexts.right);
        await this.expectFrameText('bottom', expectedTexts.bottom);
    }
}
