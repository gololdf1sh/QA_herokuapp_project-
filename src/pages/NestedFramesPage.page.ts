import { Page, FrameLocator, expect } from '@playwright/test';

export class NestedFramesPage {
    readonly page: Page;
    readonly frameTop: FrameLocator;
    readonly frameLeft: FrameLocator;
    readonly frameMiddle: FrameLocator;
    readonly frameRight: FrameLocator;
    readonly frameBottom: FrameLocator;

    constructor(page: Page) {
        this.page = page;
        this.frameTop = page.frameLocator('frame[name="frame-top"]');
        this.frameLeft = this.frameTop.frameLocator('frame[name="frame-left"]');
        this.frameMiddle = this.frameTop.frameLocator('frame[name="frame-middle"]');
        this.frameRight = this.frameTop.frameLocator('frame[name="frame-right"]');
        this.frameBottom = page.frameLocator('frame[name="frame-bottom"]');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/nested_frames');
    }

    async getLeftFrameText(): Promise<string> {
        return await this.frameLeft.locator('body').innerText();
    }

    async getMiddleFrameText(): Promise<string> {
        return await this.frameMiddle.locator('body').innerText();
    }

    async getRightFrameText(): Promise<string> {
        return await this.frameRight.locator('body').innerText();
    }

    async getBottomFrameText(): Promise<string> {
        return await this.frameBottom.locator('body').innerText();
    }

    async assertFrameText(frame: string, expectedText: string) {
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

        expect(actualText.trim()).toBe(expectedText);
    }
}
