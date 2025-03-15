import { Page, Locator, expect } from '@playwright/test';

export class EntryAdPage {
    readonly page: Page;
    readonly modal: Locator;
    readonly closeModalButton: Locator;
    readonly clickHereLink: Locator;

    constructor(page: Page) {
        this.page = page;
        // Локатор модального вікна
        this.modal = page.locator('.modal');
        // Кнопка закриття модального вікна
        this.closeModalButton = page.locator('.modal-footer p');
        // Кнопка "Click Here" для повторного виклику модалки
        this.clickHereLink = page.locator('#restart-ad');
    }

    // Перехід на сторінку Entry Ad
    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/entry_ad');
    }

    // Перевірка, чи модалка видима/невидима
    async assertModalVisible(visible: boolean) {
        if (visible) {
            await expect(this.modal).toBeVisible();
        } else {
            await expect(this.modal).toBeHidden();
        }
    }

    // Клік по кнопці закриття модалки
    async closeModal() {
        await this.closeModalButton.click();
        // Даємо час на оновлення DOM
        await expect(this.modal).toBeHidden();
    }

    // Повторний виклик модального вікна через Click Here
    async triggerModalAgain() {
        await expect(this.clickHereLink).toBeVisible(); // Очікуємо, що кнопка буде видима
        await this.clickHereLink.click();
        // Перевіряємо, що модалка знову зʼявилась
        await expect(this.modal).toBeVisible();
    }
}
