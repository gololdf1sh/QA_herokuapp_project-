import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Entry Ad
 */
export class EntryAdPage {
    readonly page: Page;

    private modal: Locator;
    private closeButton: Locator;
    private reEnableButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.modal = page.locator('.modal');
        this.closeButton = page.locator('.modal .modal-footer p');
        this.reEnableButton = page.locator('#restart-ad');
    }

    /**
     * Перехід на сторінку Entry Ad
     */
    async goto(): Promise<void> {
        await this.page.goto('/entry_ad');
    }

    /**
     * Перевіряє, що модальне вікно з'явилося
     */
    async expectModalVisible(): Promise<void> {
        await expect(this.modal).toBeVisible();
    }

    /**
     * Закриває модальне вікно
     */
    async closeModal(): Promise<void> {
        await this.closeButton.click();
        await expect(this.modal).toBeHidden();
    }

    /**
     * Відкриває модальне вікно повторно через кнопку
     */
    async reEnableModal(): Promise<void> {
        await this.reEnableButton.click();
        await expect(this.modal).toBeVisible();
    }
}
