import { Page, Locator, expect } from '@playwright/test';

export class ExitIntentPage {
    readonly page: Page;
    readonly modal: Locator;
    readonly modalCloseButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modal = page.locator('.modal');
        this.modalCloseButton = page.locator('.modal-footer p');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/exit_intent');
    }

    async triggerExitIntent() {
        // Додаємо невелику затримку для надійності
        await this.page.waitForTimeout(500);
        // Імітуємо рух миші за межі сторінки (вгору за межу екрану)
        await this.page.mouse.move(100, 100); // Спочатку на середині
        await this.page.mouse.move(100, -10); // Тепер вище за межу екрану ➜ викликає exit intent
    }

    async closeModal() {
        await this.modalCloseButton.click();
    }

    async assertModalVisible(visible: boolean) {
        if (visible) {
            await expect(this.modal).toBeVisible();
        } else {
            await expect(this.modal).toBeHidden();
        }
    }
}
