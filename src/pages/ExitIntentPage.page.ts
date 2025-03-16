import { Page, Locator, expect } from '@playwright/test';

export class ExitIntentPage {
    readonly page: Page;
    private modal: Locator;
    private modalCloseButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modal = page.locator('.modal'); // Локатор модалки
        this.modalCloseButton = page.locator('.modal-footer p'); // Кнопка закриття
    }

    /**
     * Переходимо на сторінку Exit Intent
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/exit_intent');
    }

    /**
     * Тригеримо Exit Intent шляхом імітації руху мишки
     */
    async triggerExitIntent() {
        // Додаємо невелику затримку для надійності
        await this.page.waitForTimeout(500);
        // Імітуємо рух миші за межі сторінки (вгору за межу екрану)
        await this.page.mouse.move(100, 100); // Спочатку на середині
        await this.page.mouse.move(100, -10); // Тепер вище за межу екрану ➜ викликає exit intent
    }

    /**
     * Закриваємо модальне вікно
     */
    async closeModal(): Promise<void> {
        await this.modalCloseButton.click(); // Клік на кнопку "Close"
    }

    /**
     * Асерт: чи модальне вікно відображається / приховано
     * @param visible - true, якщо очікуємо видимість; false - якщо прихованість
     */
    async assertModalVisible(visible: boolean): Promise<void> {
        if (visible) {
            await expect(this.modal).toBeVisible(); // Очікуємо, що модалка видима
        } else {
            await expect(this.modal).toBeHidden(); // Очікуємо, що модалка прихована
        }
    }
}






