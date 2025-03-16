import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Broken Images
 */
export class BrokenImagesPage {
    readonly page: Page;

    /**
     * Локатор для всіх зображень на сторінці
     */
    private images: Locator;

    /**
     * Конструктор класу BrokenImagesPage
     * @param page - об'єкт Playwright Page
     */
    constructor(page: Page) {
        this.page = page;

        // Локатор для всіх <img> на сторінці
        this.images = page.locator('img');
    }

    /**
     * Перехід на сторінку Broken Images
     */
    async goto(): Promise<void> {
        await this.page.goto('/broken_images');
    }

    /**
     * Перевірка всіх зображень на наявність пошкоджених (broken)
     * @param expectedBrokenCount - очікувана кількість зламаних зображень
     */
    async expectBrokenImages(expectedBrokenCount: number): Promise<void> {
        const imageCount = await this.images.count();
        let brokenImages = 0;

        for (let i = 0; i < imageCount; i++) {
            const img = this.images.nth(i);
            const isImageBroken = await img.evaluate((node: HTMLImageElement) => {
                return !node.complete || typeof node.naturalWidth === 'undefined' || node.naturalWidth === 0;
            });

            if (isImageBroken) {
                brokenImages++;
            }
        }

        // Перевірка кількості зламаних зображень
        expect(brokenImages).toBe(expectedBrokenCount);
    }
}
