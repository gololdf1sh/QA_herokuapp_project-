import { Page, FrameLocator, Locator, expect } from '@playwright/test';

export class FramesPage {
    readonly page: Page;

    private iframeFrame: FrameLocator;
    private editorBody: Locator;

    constructor(page: Page) {
        this.page = page;
        this.iframeFrame = page.frameLocator('#mce_0_ifr');
        this.editorBody = this.iframeFrame.locator('body');
    }

    async gotoNestedFrames(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/nested_frames');
    }

    async gotoIFramePage(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/iframe');
    }

    async assertMiddleFrameText(expectedText: string): Promise<void> {
        const frame = await this.page.frame({ name: 'frame-middle' });
        const text = await frame?.locator('#content').textContent();
        expect(text?.trim()).toBe(expectedText);
    }

    async assertLeftFrameText(expectedText: string): Promise<void> {
        const frameTop = this.page.frame({ name: 'frame-top' });
        const frameLeft = (await frameTop)?.childFrames().find(f => f.name() === 'frame-left');
        const text = await frameLeft?.locator('body').textContent();
        expect(text?.trim()).toBe(expectedText);
    }

    // 🟢 Стабільний, не deprecated метод введення тексту
    async typeInEditor(text: string): Promise<void> {
        await this.page.waitForFunction(() =>
            (window as any).tinymce && (window as any).tinymce.activeEditor && !(window as any).tinymce.activeEditor.isReadOnly()
        );

        // Очистити редактор через JS API
        await this.page.evaluate(() => {
            (window as any).tinymce.activeEditor.setContent('');
        });

        // Вставити новий текст через JS API редактора
        await this.page.evaluate((content) => {
            (window as any).tinymce.activeEditor.insertContent(content);
        }, text);
    }

    async assertEditorText(expectedText: string): Promise<void> {
        const text = await this.editorBody.textContent();
        expect(text?.trim()).toBe(expectedText);
    }
}
