import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Dynamic Loading
 */
export class DynamicLoadingPage {
    readonly page: Page;

    private startButton: Locator;
    private loadingIndicator: Locator;
    private loadedContent: Locator;

    constructor(page: Page) {
        this.page = page;

        this.startButton = page.locator('#start button');
        this.loadingIndicator = page.locator('#loading');
        this.loadedContent = page.locator('#finish h4');
    }

    /**
     * Перехід на сторінку Dynamic Loading ➔ варіант 1 або 2
     * @param exampleNumber - номер прикладу (1 або 2)
     */
    async goto(exampleNumber: number): Promise<void> {
        await this.page.goto(`/dynamic_loading/${exampleNumber}`);
    }

    /**
     * Натискає кнопку Start і чекає на завершення завантаження
     * @param exampleNumber - номер прикладу (1 або 2)
     */
    async clickStartAndWaitForContent(exampleNumber: number): Promise<void> {
        await this.startButton.click();

        // Чекаємо появи лоадера
        await expect(this.loadingIndicator).toBeVisible();

        // Чекаємо зникнення лоадера ➔ waitForSelector краще працює в цьому кейсі
        await this.page.waitForSelector('#loading', { state: 'hidden', timeout: 10000 });

        // Перевіряємо, що контент з'явився
        await expect(this.loadedContent).toBeVisible();
    }

    /**
     * Перевіряє текст завантаженого контенту
     * @param expectedText - очікуваний текст
     */
    async expectLoadedContentText(expectedText: string): Promise<void> {
        await expect(this.loadedContent).toHaveText(expectedText);
    }
}
