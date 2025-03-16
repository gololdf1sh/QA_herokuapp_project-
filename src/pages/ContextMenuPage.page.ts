import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Context Menu
 */
export class ContextMenuPage {
    readonly page: Page;

    /**
     * Локатор для області, що викликає контекстне меню
     */
    private hotSpot: Locator;

    /**
     * Конструктор класу ContextMenuPage
     * @param page - об'єкт Playwright Page
     */
    constructor(page: Page) {
        this.page = page;

        // Локатор елемента, що викликає контекстне меню
        this.hotSpot = page.locator('#hot-spot');
    }

    /**
     * Перехід на сторінку Context Menu
     */
    async goto(): Promise<void> {
        await this.page.goto('/context_menu');
    }

    /**
     * Викликає контекстне меню правим кліком на гарячій зоні
     */
    async triggerContextMenu(): Promise<void> {
        await this.hotSpot.click({ button: 'right' });
    }

    /**
     * Перевіряє текст alert-повідомлення після виклику контекстного меню
     * @param expectedMessage - очікуваний текст alert
     */
    async expectAlertMessage(expectedMessage: string): Promise<void> {
        this.page.once('dialog', async (dialog) => {
            expect(dialog.message()).toBe(expectedMessage);
            await dialog.dismiss(); // закриваємо alert, щоб не блокував тест
        });
    }
}
